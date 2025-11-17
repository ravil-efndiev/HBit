import { NextResponse } from "next/server";

const responseStatus = { status: 400 };

export const validatePassword = (password: string) => {
  const spaceRegex = /^[^\s]+$/;
  if (password.length < 6)
    return NextResponse.json(
      { error: "Password has to be 6 characters or longer" },
      responseStatus
    );
  if (password.length > 30)
    return NextResponse.json({ error: "Password is too long" }, responseStatus);
  if (!spaceRegex.test(password))
    return NextResponse.json(
      { error: "Password must not contain any spaces" },
      responseStatus
    );
};

export const validateName = (name: string) => {
  if (name.length < 3)
    return NextResponse.json(
      { error: "Name has to be 3 characters or longer" },
      responseStatus
    );
  if (name.length > 24)
    return NextResponse.json(
      { error: "Name has to be shorter than 24 characters" },
      responseStatus
    );
};

export function validateEmail(email: string) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(email))
    return NextResponse.json({ error: "Invalid email!" }, responseStatus);
}
