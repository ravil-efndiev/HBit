import {
  validateEmail,
  validateName,
  validatePassword,
} from "@/lib/validation";

import { prisma } from "@/lib/prisma";

import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { sessionMaxAge, setSessionCookie } from "@/lib/sessionCookie";

export const POST = async (req: Request) => {
  try {
    const { name, email, password } = await req.json();

    const nameTrimmed = name.trim();
    const errName = validateName(nameTrimmed);
    if (errName) return errName;

    const errEmail = validateEmail(email);
    if (errEmail) return errEmail;

    const errPass = validatePassword(password);
    if (errPass) return errPass;

    const alreadyExists = await prisma.user.findUnique({
      where: { email: email },
    });

    if (alreadyExists) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: { name: nameTrimmed, email, password: hashedPassword },
    });

    const session = await prisma.session.create({
      data: {
        userId: newUser.id,
        expiresAt: new Date(Date.now() + sessionMaxAge),
      },
    });

    const res = NextResponse.json({ user: newUser }, { status: 201 });

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
