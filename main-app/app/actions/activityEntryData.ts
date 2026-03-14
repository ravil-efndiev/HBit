import { prisma } from "@/lib/prisma";
import { PromiseReturnType } from "@prisma/client/extension";
import { publicServiceRequest } from "@/lib/requests";
import { ActivityType } from "@prisma/client";

export const getActivityEntryData = async (
  activityType: ActivityType,
  newActivityEntryDate?: Date,
) => {
  const entries = await prisma.activityEntry.findMany({
    where: { typeId: activityType.id },
    orderBy: { date: "desc" },
  });

  const lastWeekEntries =
    entries.length > 0
      ? entries.filter(
          (entry) =>
            entry.date.getTime() > Date.now() - 1000 * 60 * 60 * 24 * 7,
        ).length
      : 0;

  return {
    totalEntries: entries.length,
    lastWeekEntries: lastWeekEntries,
    lastEntryTime: newActivityEntryDate || new Date(entries[0].date),
  };
};

export const updatePublicActivityData = async (
  typeId: string,
  entryData: PromiseReturnType<typeof getActivityEntryData>,
) => {
  await publicServiceRequest({
    endpoint: "/public-activities",
    method: "PATCH",
    body: {
      activityTypePrivateId: typeId,
      ...entryData,
    },
  });
};
