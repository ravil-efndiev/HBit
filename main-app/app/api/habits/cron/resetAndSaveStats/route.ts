import { routeError } from "@/api/routeError";
import { prisma } from "@/lib/prisma";
import { makeStatsKey, redis } from "@/lib/redis";
import { HabitStatWithHabit } from "@/lib/types";
import { DailyHabitStat } from "@prisma/client";
import { NextResponse } from "next/server";

const calculateStreak = (stats: DailyHabitStat[], completed: boolean) => {
  const prevStat = stats[0];
  const currentStreak = completed
    ? (stats.length > 0 ? prevStat.streakC : 0) + 1
    : 0;

  const longestStreak =
    prevStat.streakL <= currentStreak ? currentStreak : prevStat.streakL;

  return [currentStreak, longestStreak];
};

const setStatsCache = async (allStats: HabitStatWithHabit[]) => {
  const userIds = Array.from(
    new Set(allStats.map((stat) => stat.habit.userId))
  );

  await Promise.all(userIds.map((id) => redis.del(makeStatsKey(id))));

  await Promise.all(
    allStats.map((stat) =>
      redis.rpush(makeStatsKey(stat.habit.userId), JSON.stringify(stat))
    )
  );

  await Promise.all(
    userIds.map((id) => redis.expire(makeStatsKey(id), 60 * 60 * 24))
  );
};

export const GET = async (req: Request) => {
  try {
    const authHeader = req.headers.get("authorization");
    if (authHeader != `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json(
        { error: "Route only accessible from cron job" },
        { status: 401 }
      );
    }

    const dailyHabits = await prisma.dailyHabit.findMany({
      include: { stats: { orderBy: { date: "desc" }, take: 1 } },
    });

    const now = new Date();

    const txResults = await prisma.$transaction([
      prisma.dailyHabitStat.createMany({
        data: dailyHabits.map((habit) => {
          const completed = habit.timeSpent >= habit.timeGoal;
          const [streakC, streakL] = calculateStreak(habit.stats, completed);

          return {
            habitId: habit.id,
            completed,
            timeSpent: habit.timeSpent,
            date: now,
            streakC,
            streakL,
          };
        }),
      }),
      prisma.dailyHabit.updateMany({
        data: { timeSpent: 0 },
      }),
      prisma.dailyHabitStat.findMany({ include: { habit: true } }),
    ]);

    await setStatsCache(txResults[2]);

    return NextResponse.json({ message: "reset successful" }, { status: 200 });
  } catch (err) {
    return routeError(err);
  }
};
