import { routeError } from "@/api/routeError";
import { publicServiceRequest } from "@/lib/requests";
import { requireSessionUser } from "@/lib/session";
import { PublicUser } from "@/lib/types";
import { NextResponse } from "next/server";

export const GET = async (
  _: Request,
  { params }: { params: Promise<{ usernamePart: "string" }> }
) => {
  try {
    const user = await requireSessionUser();
    const { usernamePart } = await params;

    const { found } = (await publicServiceRequest({
      endpoint: `/users/search/${usernamePart}`,
      method: "GET",
    })) as { found: PublicUser[] };

    const foundUsers = found.filter(
      (foundUser) => foundUser.publicId !== user.publicId
    );

    return NextResponse.json({ foundUsers }, { status: 200 });
  } catch (err) {
    return routeError(err);
  }
};
