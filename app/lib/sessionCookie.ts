import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const sessionMaxAge = 1000 * 60 * 60 * 24 * 5;

export const setSessionCookie = async (sessionId: string) => {
  const cookieStorage = await cookies();
  cookieStorage.set("session", sessionId, {
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: sessionMaxAge,
    path: "/",
  });
};

export const clearSessionCookie = async () => {
  const cookieStorage = await cookies();
  cookieStorage.delete("session");
};
