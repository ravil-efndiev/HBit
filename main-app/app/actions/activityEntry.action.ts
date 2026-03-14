"use server";

import { prisma } from "@/lib/prisma";
import {
  actionInternalError,
  actionResultActivityEntry,
  ActivityEntryActionResult,
} from "./actionResult";
import { getActivityEntryData } from "./activityEntryData";
import { updatePublicActivityData } from "./activityEntryData";
import { ActionResult, actionSucess } from "./actionResult";

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

    const activityType = await prisma.activityType.findUnique({
      where: { id: typeId },
    });

    if (!activityType) {
      return actionInternalError(
        "Activity type doesnt exits",
      ) as ActivityEntryActionResult;
    }

    const newActivityEntry = await prisma.activityEntry.create({
      data: { typeId, date, note },
      include: { type: true },
    });

    if (activityType.isPublic) {
      try {
        const entryData = await getActivityEntryData(
          activityType,
          newActivityEntry.date,
        );
        await updatePublicActivityData(activityType.id, entryData);
      } catch (err) {
        console.error(err);
        await prisma.activityEntry.delete({
          where: { id: newActivityEntry.id },
        });
      }
    }

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
      Object.entries({ date, note }).filter(([_, v]) => v !== undefined),
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

export const deleteActivityEntry = async (
  id: number,
  typeId: string,
): Promise<ActionResult> => {
  try {
    await prisma.activityEntry.delete({ where: { id } });

    const activityType = await prisma.activityType.findUnique({
      where: { id: typeId },
    });

    if (!activityType) {
      return actionInternalError("Activity type doesnt exits");
    }

    const entryData = await getActivityEntryData(activityType);
    await updatePublicActivityData(activityType.id, entryData);

    return actionSucess();
  } catch (err) {
    return actionInternalError(err);
  }
};
