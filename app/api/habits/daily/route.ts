import { requireSessionUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
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
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
