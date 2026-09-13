"use server";

import { prisma } from "@/lib/prisma";
import { EntryWithType } from "@/lib/types";
import { Prisma } from "@prisma/client";

interface ChunkFetchResult {
  chunk: EntryWithType[];
  endOfData: boolean;
}

export const fetchEntriesChunk = async (
  chunkSize: number,
  beforeDate?: Date | string,
): Promise<ChunkFetchResult> => {
  const dateCondition = beforeDate
    ? Prisma.sql`WHERE "date" < ${new Date(beforeDate)}`
    : Prisma.empty;

  const targetDates = await prisma.$queryRaw<{ day: Date; count: bigint }[]>`
    SELECT DATE("date") as day, COUNT(*) as count
    FROM "ActivityEntry"
    ${dateCondition}
    GROUP BY DATE("date")
    ORDER BY day DESC
    LIMIT 10;
  `;

  if (!targetDates.length) return { chunk: [], endOfData: true };

  let accumulatedCount = 0;
  let cutoffDate = targetDates[0].day;

  for (const { day, count } of targetDates) {
    cutoffDate = day;
    accumulatedCount += Number(count);
    if (accumulatedCount >= chunkSize) break;
  }

  return {
    chunk: await prisma.activityEntry.findMany({
      where: {
        date: {
          gte: new Date(new Date(cutoffDate).setUTCHours(0, 0, 0, 0)),
          ...(beforeDate && { lt: new Date(beforeDate) }),
        },
      },
      include: { type: true },
      orderBy: { date: "desc" },
    }),
    endOfData: accumulatedCount < chunkSize,
  };
};
