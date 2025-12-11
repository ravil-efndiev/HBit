import { ActivityEntry, ActivityType } from "@prisma/client";

export type EntryWithType = ActivityEntry & { type: ActivityType };
export type TypeWithEntries = ActivityType & { entries: ActivityEntry[] };

export interface ReadableTime {
  minutes: number;
  hours: number;
}

export interface PublicUserResponseType {
  id: string;
  username: string;
  name: string;
  pfpUrl: string | null;
}
