import { prisma } from "@/lib/prisma";
import { sessionMaxAge, setSessionCookie } from "@/lib/sessionCookie";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { error: "Account doesn't exist" },
        { status: 401 }
      );
    }

    const passHashed = user.password;
    const match = await bcrypt.compare(password, passHashed);
    if (!match) {
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 401 }
      );
    }

    const session = await prisma.session.create({
      data: {
        userId: user.id,
        expiresAt: new Date(Date.now() + sessionMaxAge),
      },
    });

    const res = NextResponse.json({ user }, { status: 200 });
    setSessionCookie(session.id, res);

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
