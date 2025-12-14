import { cookies } from "next/headers";
import { prisma } from "./prisma";
import { cache } from "react";

export const getSessionUser = cache(async () => {
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

  return session.user;
});

export const requireSessionUser = async () => {
  const user = await getSessionUser();

  if (!user) {
    throw new Error("User is logged out or session has expired");
  }

  return user;
}
