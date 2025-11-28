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

export const orderDataByDate = <T>(data: T[], compareDatesOnly: boolean) => {
  const dates: Date[] = Array.from(
    new Map(
      data
        .map((item: any) => item.date)
        .map((date: Date) => [
          compareDatesOnly
            ? date.toISOString().split("T")[0]
            : date.toISOString(),
          date,
        ])
    ).values()
  );

  return dates.map((date: Date) =>
    data.filter((item: any) =>
      compareDatesOnly
        ? item.date.toISOString().split("T")[0] ===
          date.toISOString().split("T")[0]
        : item.date.toISOString() === date.toISOString()
    )
  );
};
