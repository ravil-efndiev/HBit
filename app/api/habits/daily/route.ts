import { requireSessionUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { routeError } from "@/api/routeError";

export const POST = async (req: Request) => {
  try {
    const user = await requireSessionUser();
    const { name, desc, iconPath, timeGoal } = await req.json();

    const newHabit = await prisma.dailyHabit.create({
      data: {
        name,
        details: desc,
        iconPath,
        timeGoal,
        userId: user.id,
      },
    });

    return NextResponse.json({ newHabit }, { status: 201 });
  } catch (err) {
    return routeError(err);
  }
};

export const GET = async (req: Request) => {
  try {
    const user = await requireSessionUser();
    const url = new URL(req.url);

    const habitId = url.searchParams.get("habitId");
    if (!habitId) {
      const habits = await prisma.dailyHabit.findMany({
        where: { userId: user.id },
      });
      return NextResponse.json({ habits }, { status: 200 });
    }

    const searchedHabit = await prisma.dailyHabit.findUnique({
      where: { userId: user.id, id: parseInt(habitId) },
    });

    return NextResponse.json({ searchedHabit }, { status: 200 });
  } catch (err) {
    return routeError(err);
  }
};

export const PATCH = async (req: Request) => {
  try {
    const user = await requireSessionUser();
    const { habitId, name, desc, iconPath, timeGoal, timeSpent } =
      await req.json();

    const editFields = Object.fromEntries(
      Object.entries({
        name,
        details: desc,
        iconPath,
        timeGoal,
        timeSpent,
      }).filter(([_, v]) => v !== undefined)
    );

    const patchedHabit = await prisma.dailyHabit.update({
      where: { userId: user.id, id: habitId },
      data: editFields,
    });

    return NextResponse.json({ patchedHabit }, { status: 200 });
  } catch (err) {
    return routeError(err);
  }
};

export const DELETE = async (req: Request) => {
  try {
    const user = await requireSessionUser();
    const { habitId } = await req.json();

    await prisma.dailyHabit.delete({ where: { userId: user.id, id: habitId } });

    return NextResponse.json({ message: "delete successful" }, { status: 200 });
  } catch (err) {
    return routeError(err);
  }
};
