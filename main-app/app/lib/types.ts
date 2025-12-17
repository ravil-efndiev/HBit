import {
  ActivityEntry,
  ActivityType,
  DailyHabit,
  DailyHabitStat,
} from "@prisma/client";

export type EntryWithType = ActivityEntry & { type: ActivityType };
export type TypeWithEntries = ActivityType & { entries: ActivityEntry[] };
export type HabitStatWithHabit = DailyHabitStat & { habit: DailyHabit };
export type DailyHabitWithStreak = DailyHabit & {
  stats: { streakC: number }[];
};

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
