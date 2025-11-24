import { redirect } from "next/navigation";

export const formatDays = (days: string[]) => {
  if (days.length < 7) return;
  const formatted = [...days];
  formatted.push(formatted.shift()!);
  return formatted;
};

export const redirectWithError = (to: string, error: string) => {
  redirect(`${to}?error=${encodeURIComponent(error)}`);
};
