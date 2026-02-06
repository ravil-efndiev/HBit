import {
  ActivityEntry,
  ActivityType,
  DailyHabit,
  DailyHabitStat,
  User,
} from "@prisma/client";

export interface UserWithPublicId extends User {
  publicId: string;
}

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

export interface PublicUser {
  publicId: string;
  username: string;
  name: string;
  pfpUrl: string | null;
}

export interface PublicActivity {
  name: string;
  publicId: string;
  iconPath: string;
  color: string;
  details: string;
  lastEntryTime: Date | null;
  totalEntries: number;
  lastWeekEntries: number;
  userId: string;
}
