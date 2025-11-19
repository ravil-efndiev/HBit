import { redirect } from "next/navigation";

export const redirectWithError = (to: string, error: string) => {
  redirect(`${to}?error=${encodeURIComponent(error)}`);
};
