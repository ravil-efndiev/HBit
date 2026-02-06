"use server";

import { requireSessionUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { getGenericDeleteAction } from "@/api/genericDelete";
import { actionInternalError, actionSucess } from "./actionResult";
import { publicServiceRequest } from "@/lib/requests";

interface CreateActivityTypeArgs {
  userPublicId: string;
  name: string;
  details: string;
  iconPath: string;
  color: string;
  isPublic: boolean;
}

export const createActivityType = async ({
  userPublicId,
  name,
  details,
  iconPath,
  color,
  isPublic,
}: CreateActivityTypeArgs) => {
  try {
    const user = await requireSessionUser();

    const newActivity = await prisma.activityType.create({
      data: { userId: user.id, name, details, iconPath, color, isPublic },
    });

    if (isPublic) {
      try {
        await publicServiceRequest({
          endpoint: "/public-activities",
          method: "POST",
          body: {
            userPublicId,
            activityTypePrivateId: newActivity.id,
            name,
            details,
            iconPath,
            color,
            totalEntries: 0,
            lastWeekEntries: 0,
          },
        });
      } catch (err) {
        console.error(err);
        await prisma.activityType.delete({ where: { id: newActivity.id } });
      }
    }

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
