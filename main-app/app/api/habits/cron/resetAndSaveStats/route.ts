import { routeError } from "@/api/routeError";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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
    
    await prisma.$transaction([
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
    ]);

    return NextResponse.json({ message: "reset successful" }, { status: 200 });
  } catch (err) {
    return routeError(err);
  }
};
