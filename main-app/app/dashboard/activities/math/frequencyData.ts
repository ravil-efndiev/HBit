import { compareDates } from "@/lib/misc";
import { TypeWithEntries } from "@/lib/types";
import { ActivityEntry } from "@prisma/client";

export interface GraphDataEntry {
  n: number;
  date: string;
}

export const getMinMaxDateFromEntries = (entries: ActivityEntry[]) => {
  const dates =
    entries.length > 0 ? entries.map((e) => new Date(e.date)) : [new Date()];
  const minDate = new Date(Math.min(...dates.map((d) => d.getTime())));
  let maxDate = new Date(Math.max(...dates.map((d) => d.getTime())));
  minDate.setHours(0, 0, 0, 0);
  maxDate.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (maxDate < today) {
    maxDate = new Date(today);
  }

  return { minDate, maxDate };
};

export const fillAllDates = (
  minDate: Date,
  maxDate: Date,
  blankAmount: "weekAndLess" | "month"
) => {
  let allDates: Date[] = [];
  for (let d = new Date(minDate); d <= maxDate; d.setDate(d.getDate() + 1)) {
    allDates.push(new Date(d));
  }

  minDate.setDate(
    blankAmount === "weekAndLess"
      ? minDate.getDate() -
          (8 - allDates.length > 0 ? 8 - allDates.length : 0) -
          1
      : 1
  );
  const blankDates: Date[] = [];
  for (let d = new Date(minDate); d < allDates[0]; d.setDate(d.getDate() + 1)) {
    blankDates.push(new Date(d));
  }

  allDates = blankDates.concat(allDates);
  return allDates;
};

export const splitDate = (date: Date) => date.toLocaleDateString().split("/");

const leaveOnlyLast30Entries = (array: GraphDataEntry[]) => {
  if (array.length > 30) {
    const toRemove = array.length - 30;
    return array.slice(toRemove);
  }
  return array;
}

const splitArrToChunks = (array: GraphDataEntry[], size: number) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }

  return chunks;
};

export const getFrequencyData = (activityType: TypeWithEntries) => {
  const { minDate, maxDate } = getMinMaxDateFromEntries(activityType.entries);

  const allDates = fillAllDates(minDate, maxDate, "weekAndLess");

  const data = allDates.map((date) => ({
    date: splitDate(date)[1] + "." + splitDate(date)[0],
    n: activityType.entries.filter((entry) =>
      compareDates(entry.date, date, true)
    ).length,
  }));

  const dataLast30 = leaveOnlyLast30Entries(data);
  const chunkedData = splitArrToChunks(dataLast30, 10);

  return chunkedData;
};
