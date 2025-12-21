"use server";

import { prisma } from "@/lib/prisma";
import {
  actionInternalError,
  actionResultActivityEntry,
  ActivityEntryActionResult,
} from "./actionResult";
import { getGenericDeleteAction } from "@/api/genericDelete";

interface CreateActivityEntryArgs {
  typeId: string;
  dateStr: string;
  note: string;
}

export const createActivityEntry = async ({
  typeId,
  dateStr,
  note,
}: CreateActivityEntryArgs): Promise<ActivityEntryActionResult> => {
  try {
    const date = new Date(dateStr);

    const newActivityEntry = await prisma.activityEntry.create({
      data: { typeId, date, note },
      include: { type: true },
    });

    return actionResultActivityEntry(newActivityEntry);
  } catch (err) {
    return actionInternalError(err) as ActivityEntryActionResult;
  }
};

interface UpdateActivityEntryArgs {
  entryId: number;
  dateStr?: string;
  note?: string;
}

export const updateActivityEntry = async ({
  entryId,
  dateStr,
  note,
}: UpdateActivityEntryArgs): Promise<ActivityEntryActionResult> => {
  try {
    const date = dateStr ? new Date(dateStr) : undefined;

    const updateData = Object.fromEntries(
      Object.entries({ date, note }).filter(([_, v]) => v !== undefined)
    );

    const updatedActivityEntry = await prisma.activityEntry.update({
      where: { id: entryId },
      data: updateData,
      include: { type: true },
    });

    return actionResultActivityEntry(updatedActivityEntry);
  } catch (err) {
    return actionInternalError(err) as ActivityEntryActionResult;
  }
};

export const deleteActivityEntry = getGenericDeleteAction(prisma.activityEntry);
