import { ReadableTime } from "./types";

export const msToMinutesHours = (ms: number | undefined) => {
  if (ms === undefined) return undefined;
  const totalMinutes = Math.floor(ms / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return { minutes, hours };
};

export const minutesHoursToMs = (time: ReadableTime) => {
  return time.minutes * 60 * 1000 + time.hours * 60 * 60 * 1000;
};

export const appendTimeZero = (time: number): string => {
  return time < 10 ? `0${time}` : `${time}`;
};
