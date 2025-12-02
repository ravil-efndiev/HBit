import { NextResponse } from "next/server";
import { routeError } from "@/api/routeError";
import { requireSessionUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { getGenericDelete } from "@/api/genericDelete";

export const POST = async (req: Request) => {
  try {
    const user = await requireSessionUser();
    const { name, details, iconPath, color } = await req.json();

    const newActivityType = await prisma.activityType.create({
      data: { userId: user.id, name, details, iconPath, color },
    });

    return NextResponse.json({ newActivityType }, { status: 200 });
  } catch (err) {
    return routeError(err);
  }
};

export const PATCH = async (req: Request) => {
  try {
    const user = await requireSessionUser();
    const { typeId, name, details, iconPath, color } = await req.json();

    const updateData = Object.fromEntries(
      Object.entries({
        name,
        details,
        iconPath,
        color,
      }).filter(([_, v]) => v !== undefined)
    );

    const updatedActivityType = await prisma.activityType.update({
      where: { userId: user.id, id: typeId },
      data: updateData,
    });

    return NextResponse.json({ updatedActivityType }, { status: 200 });
  } catch (err) {
    return routeError(err);
  }
};

export const DELETE = getGenericDelete(prisma.activityType);
