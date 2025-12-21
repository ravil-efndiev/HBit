"use server";

import { prisma } from "@/lib/prisma";
import { sessionMaxAge, setSessionCookie } from "@/lib/sessionCookie";
import {
  validateName,
  validateEmail,
  validatePassword,
  validateUsername,
} from "@/lib/validation";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { redirectWithError } from "@/lib/misc";
import { createPublicUser, isPublicServiceOnline } from "@/lib/publicService";

export const signupAction = async (formData: FormData) => {
  const username = formData.get("username") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const nameTrimmed = name.trim();

  try {
    validateUsername(username);
    validateName(nameTrimmed);
    validateEmail(email);
    validatePassword(password);
  } catch (err) {
    return redirectWithError("/auth/signup", (err as Error).message);
  }

  const alreadyExists = await prisma.user.findFirst({
    where: { OR: [{ email: email }, { username: username }] },
    select: { id: true },
  });

  if (alreadyExists) {
    return redirectWithError(
      "/auth/signup",
      "Account with such email or username already exists"
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await prisma.user.create({
    data: { username, name: nameTrimmed, email, password: hashedPassword },
  });

  const psOnline = await isPublicServiceOnline();
  if (psOnline) {
    try {
      const publicUser = await createPublicUser(
        newUser.id,
        newUser.username,
        newUser.name,
        null
      );
      console.log(publicUser);
    } catch (err) {
      await prisma.user.delete({ where: { id: newUser.id } });
      return redirectWithError("/auth/signup", (err as Error).message);
    }
  }

  const session = await prisma.session.create({
    data: {
      userId: newUser.id,
      expiresAt: new Date(Date.now() + sessionMaxAge),
    },
  });

  await setSessionCookie(session.id);

  redirect("/dashboard");
};
