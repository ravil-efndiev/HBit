import { redirect } from "next/navigation";
import { JSX, ReactNode } from "react";
import { RequestError } from "./requests";

export const formatDays = (days: string[]) => {
  if (days.length < 7) return;
  const formatted = [...days];
  formatted.push(formatted.shift()!);
  return formatted;
};

export const redirectWithError = (to: string, error: string) => {
  redirect(`${to}?error=${encodeURIComponent(error)}`);
};

export const compareDates = (a: Date, b: Date, compareDatesOnly: boolean) =>
  compareDatesOnly
    ? a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    : a.toISOString() === b.toISOString();

export const getObjectUniqueDates = <T>(data: T[], compareDatesOnly: boolean) =>
  Array.from(
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

export const orderDataByDate = <T>(data: T[], compareDatesOnly: boolean) => {
  const dates = getObjectUniqueDates(data, compareDatesOnly);
  return dates.map((date: Date) =>
    data.filter((item: any) => compareDates(item.date, date, compareDatesOnly))
  );
};

export const requestErrorWrapper = async (
  errorStatusList: number[],
  funcBody: () => ReactNode,
  onErrorReturn: ReactNode
) => {
  try {
    const node = await funcBody();
    return node;
  } catch (err) {
    const error = err as RequestError;
    if (errorStatusList.includes(error.status)) {
      return onErrorReturn;
    }
  }
};
