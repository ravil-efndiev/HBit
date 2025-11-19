import { prisma } from "@/lib/prisma";
import { requireSessionUser } from "@/lib/session";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const user = await requireSessionUser();
    const { name, desc, iconPath, days } = await req.json();

    const newHabit = await prisma.weeklyHabit.create({
      data: {
        name,
        details: desc,
        iconPath,
        days,
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
