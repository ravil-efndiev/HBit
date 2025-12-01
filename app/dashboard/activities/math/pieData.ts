import { TypeWithEntries } from "@/lib/types";

export const getPieData = (activityTypes: TypeWithEntries[]) => {
  if (
    activityTypes.length === 0 ||
    !activityTypes.some((type) => type.entries.length !== 0)
  )
    return null;

  const last7DaysFiltered = activityTypes.map((type) => ({
    ...type,
    entries: type.entries.filter(
      (entry) => entry.date.getTime() > Date.now() - 1000 * 60 * 60 * 24 * 7
    ),
  }));

  const pieData = last7DaysFiltered
    .filter((type) => type.entries.length)
    .map((type) => ({
      n: type.entries.length,
      nPercentage: 0,
      color: type.color,
      name: type.name,
    }));

  const totalN = pieData.map((entry) => entry.n).reduce((acc, n) => acc + n);
  for (const entry of pieData) {
    entry.nPercentage = Math.round((entry.n / totalN) * 100);
  }

  return pieData;
};
