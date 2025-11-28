import { ActivityEntry, ActivityType } from "@prisma/client";

export type EntryWithType = ActivityEntry & { type: ActivityType };

export interface ReadableTime {
  minutes: number;
  hours: number;
}
