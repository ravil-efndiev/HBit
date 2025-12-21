"use server";

import { requireSessionUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { getGenericDeleteAction } from "@/api/genericDelete";
import { actionInternalError, actionSucess } from "./actionResult";

interface CreateActivityTypeArgs {
  name: string;
  details: string;
  iconPath: string;
  color: string;
}

export const createActivityType = async ({
  name,
  details,
  iconPath,
  color,
}: CreateActivityTypeArgs) => {
  try {
    const user = await requireSessionUser();

    await prisma.activityType.create({
      data: { userId: user.id, name, details, iconPath, color },
    });

    return actionSucess();
  } catch (err) {
    return actionInternalError(err);
  }
};

interface UpdateActivityTypeArgs {
  typeId: string;
  name?: string;
  details?: string;
  iconPath?: string;
  color?: string;
}

export const updateActivityType = async ({
  typeId,
  name,
  details,
  iconPath,
  color,
}: UpdateActivityTypeArgs) => {
  try {
    const user = await requireSessionUser();

    const updateData = Object.fromEntries(
      Object.entries({
        name,
        details,
        iconPath,
        color,
      }).filter(([_, v]) => v !== undefined)
    );

    await prisma.activityType.update({
      where: { userId: user.id, id: typeId },
      data: updateData,
    });

    return actionSucess();
  } catch (err) {
    return actionInternalError(err);
  }
};

export const deleteActivityType = getGenericDeleteAction(prisma.activityType);
