import { NextResponse } from "next/server";
import { routeError } from "@/api/routeError";
import { prisma } from "@/lib/prisma";
import { getGenericDelete } from "@/api/genericDelete";

export const POST = async (req: Request) => {
  try {
    const { typeId, dateStr, note } = await req.json();
    const date = new Date(dateStr);

    const newActivityEntry = await prisma.activityEntry.create({
      data: { typeId, date, note },
      include: { type: true },
    });

    return NextResponse.json({ newActivityEntry }, { status: 200 });
  } catch (err) {
    return routeError(err);
  }
};

export const PATCH = async (req: Request) => {
  try {
    const { entryId, dateStr, note } = await req.json();
    const date = dateStr ? new Date(dateStr) : undefined;

    const updateData = Object.fromEntries(
      Object.entries({ date, note }).filter(([_, v]) => v !== undefined)
    );

    const updatedActivityEntry = await prisma.activityEntry.update({
      where: { id: entryId },
      data: updateData,
      include: { type: true },
    });

    return NextResponse.json({ updatedActivityEntry }, { status: 200 });
  } catch (err) {
    return routeError(err);
  }
};

export const DELETE = getGenericDelete(prisma.activityEntry);
