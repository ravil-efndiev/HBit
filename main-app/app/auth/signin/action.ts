"use server";

import { prisma } from "@/lib/prisma";
import { sessionMaxAge, setSessionCookie } from "@/lib/sessionCookie";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { redirectWithError } from "@/lib/misc";

export const signinAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return redirectWithError("/auth/signin", "Account doesn't exist");
  }

  const passHashed = user.password;
  const match = await bcrypt.compare(password, passHashed);
  if (!match) {
    return redirectWithError("/auth/signin", "Incorrect password");
  }

  const session = await prisma.session.create({
    data: {
      userId: user.id,
      expiresAt: new Date(Date.now() + sessionMaxAge),
    },
  });

  await setSessionCookie(session.id);

  redirect("/dashboard");
};
