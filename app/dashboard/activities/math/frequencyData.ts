import { compareDates } from "@/lib/misc";
import { TypeWithEntries } from "@/lib/types";

export const getFrequencyData = (activityType: TypeWithEntries) => {
  const dates =
    activityType.entries.length > 0
      ? activityType.entries.map((e) => new Date(e.date))
      : [new Date()];
  const minDate = new Date(Math.min(...dates.map((d) => d.getTime())));
  const maxDate = new Date(Math.max(...dates.map((d) => d.getTime())));
  minDate.setHours(0, 0, 0, 0);
  maxDate.setHours(0, 0, 0, 0);

  const today = new Date().getDate();
  if (maxDate.getDate() < today) {
    maxDate.setDate(today);
  }

  let allDates: Date[] = [];
  for (let d = new Date(minDate); d <= maxDate; d.setDate(d.getDate() + 1)) {
    allDates.push(new Date(d));
  }

  minDate.setDate(minDate.getDate() - (8 - allDates.length));
  const blankDates: Date[] = [];
  for (let d = new Date(minDate); d < allDates[0]; d.setDate(d.getDate() + 1)) {
    blankDates.push(new Date(d));
  }

  allDates = blankDates.concat(allDates);

  const splitDate = (date: Date) => date.toLocaleDateString().split("/");

  const data = allDates.map((date) => ({
    date: splitDate(date)[1] + "." + splitDate(date)[0],
    n: activityType.entries.filter((entry) =>
      compareDates(entry.date, date, true)
    ).length,
  }));

  return data;
};
