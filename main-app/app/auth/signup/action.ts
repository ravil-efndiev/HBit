"use server";

import { prisma } from "@/lib/prisma";
import { sessionMaxAge, setSessionCookie } from "@/lib/sessionCookie";
import {
  validateName,
  validateEmail,
  validatePassword,
} from "@/lib/validation";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { redirectWithError } from "@/lib/misc";

export const signupAction = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const nameTrimmed = name.trim();
  const errName = validateName(nameTrimmed);
  if (errName) return redirectWithError("/auth/signup", errName);

  const errEmail = validateEmail(email);
  if (errEmail) return redirectWithError("/auth/signup", errEmail);

  const errPass = validatePassword(password);
  if (errPass) return redirectWithError("/auth/signup", errPass);

  const alreadyExists = await prisma.user.findUnique({
    where: { email: email },
  });

  if (alreadyExists) {
    return redirectWithError(
      "/auth/signup",
      "Account with this email already exists"
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

  await setSessionCookie(session.id);

  redirect("/dashboard");
};
