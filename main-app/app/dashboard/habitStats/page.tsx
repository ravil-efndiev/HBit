import { requireSessionUser } from "@/lib/session";
import Breadcrumbs from "../components/Breadcrumbs";
import { prisma } from "@/lib/prisma";
import { orderDataByDate } from "@/lib/misc";
import { makeStatsKey, redis } from "@/lib/redis";
import { HabitStatWithHabit } from "@/lib/types";
import DaysHistory from "./components/DaysHistory";
import { Metadata } from "next";

const secondsUntilMidnight = () => {
  const now = new Date();
  const nextMidnightUTC = new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + 1
  );
  nextMidnightUTC.setHours(0, 0, 0, 0);

  return Math.max(
    Math.floor((nextMidnightUTC.getTime() - now.getTime()) / 1000),
    1
  );
};

const fetchStats = async (userId: string) => {
  const key = makeStatsKey(userId);
  const cache = await redis.lrange(key, 0, -1);
  if (cache.length > 0) {
    return cache
      .map((stat) => JSON.parse(stat))
      .map((stat: any) => ({
        ...stat,
        date: new Date(stat.date),
      })) as HabitStatWithHabit[];
  }

  const stats = await prisma.dailyHabitStat.findMany({
    where: { habit: { userId } },
    include: { habit: true },
  });

  await redis.rpush(key, ...stats.map((stat) => JSON.stringify(stat)));
  await redis.expire(key, secondsUntilMidnight());

  return stats;
};

export const metadata: Metadata = {
  title: "Habit statistics - Habit tracker",
};

const StatisticsPage = async () => {
  const user = await requireSessionUser();
  const stats = await fetchStats(user.id);
  const statsByDate = orderDataByDate(stats, false);

  return (
    <div className="w-full">
      <Breadcrumbs subpage="statistics" />
      <main>
        <div className="max-w-[96%] mx-auto">
          <DaysHistory statsByDate={statsByDate} />
        </div>
      </main>
    </div>
  );
};

export default StatisticsPage;
