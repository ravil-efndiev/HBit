import { prisma } from "@/lib/prisma";
import { clearSessionCookie } from "@/lib/sessionCookie";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const sessionId = req.cookies.get("session")?.value;
    if (!sessionId) {
      return NextResponse.json(
        { error: "No current session" },
        { status: 400 }
      );
    }

    await prisma.session.delete({ where: { id: sessionId } });

    await clearSessionCookie();
    return NextResponse.json({ message: "logout successful" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
