import { cookies } from "next/headers";
import { prisma } from "./prisma";
import { cache } from "react";
import { publicServiceRequest, RequestError } from "./requests";
import { createPublicUser } from "./publicService";
import { UserWithPublicId } from "./types";

export const getSessionUser = cache(
  async (): Promise<UserWithPublicId | null> => {
    const cookieStorage = await cookies();
    const sessionCookie = cookieStorage.get("session");

    if (!sessionCookie) {
      return null;
    }

    const sessionId = sessionCookie.value;
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: { user: true },
    });

    if (!session || session.expiresAt <= new Date()) {
      return null;
    }

    try {
      const { publicUser } = await publicServiceRequest({
        endpoint: "/users",
        method: "GET",
        params: { privateId: session.user.id },
      });
      return { ...session.user, publicId: publicUser.publicId };
    } catch (err) {
      const error = err as RequestError;
      if (error.status === 404) {
        const newPublicIdentity = await createPublicUser(
          session.user.id,
          session.user.username,
          session.user.name,
          session.user.pfpUrl
        );

        return { ...session.user, publicId: newPublicIdentity.publicId };
      }
      throw err;
    }
  }
);

export const requireSessionUser = async () => {
  const user = await getSessionUser();

  if (!user) {
    throw new Error("User is logged out or session has expired");
  }

  return user;
};
