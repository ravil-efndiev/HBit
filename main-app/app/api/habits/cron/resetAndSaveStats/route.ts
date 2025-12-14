import { routeError } from "@/api/routeError";
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { HabitStatWithHabit } from "@/lib/types";
import { NextResponse } from "next/server";

const makeStatsKey = (id: string) => `habit-stats:${id}`;

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

    const dailyHabits = await prisma.dailyHabit.findMany();
    const now = new Date();

    const txResults = await prisma.$transaction([
      prisma.dailyHabitStat.createMany({
        data: dailyHabits.map((habit) => ({
          habitId: habit.id,
          completed: habit.timeSpent >= habit.timeGoal,
          timeSpent: habit.timeSpent,
          date: now,
        })),
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
