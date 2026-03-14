"use server";

import { requireSessionUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import {
  actionInternalError,
  ActionResult,
  actionSucess,
} from "./actionResult";
import { publicServiceRequest } from "@/lib/requests";
import { ActivityType } from "@prisma/client";
import { getActivityEntryData } from "./activityEntryData";

interface CreateActivityTypeArgs {
  name: string;
  details: string;
  iconPath: string;
  color: string;
  isPublic: boolean;
}

const createPublicActivity = async (
  userPublicId: string,
  activityType: ActivityType,
  isNew: boolean,
) => {
  let entryData = {
    totalEntries: 0,
    lastWeekEntries: 0,
  };

  if (!isNew) {
    entryData = await getActivityEntryData(activityType);
  }

  await publicServiceRequest({
    endpoint: "/public-activities",
    method: "POST",
    body: {
      userPublicId,
      activityTypePrivateId: activityType.id,
      name: activityType.name,
      details: activityType.details,
      iconPath: activityType.iconPath,
      color: activityType.color,
      ...entryData,
    },
  });
};

const deletePublicActivity = async (privateId: string) => {
  await publicServiceRequest({
    endpoint: "/public-activities",
    method: "DELETE",
    body: {
      privateId,
    },
  });
};

export const createActivityType = async ({
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
        await createPublicActivity(user.publicId, newActivity, true);
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
  isPublic?: boolean;
}

export const updateActivityType = async ({
  typeId,
  name,
  details,
  iconPath,
  color,
  isPublic,
}: UpdateActivityTypeArgs) => {
  try {
    const user = await requireSessionUser();

    const updateData = Object.fromEntries(
      Object.entries({
        name,
        details,
        iconPath,
        color,
        isPublic,
      }).filter(([_, v]) => v !== undefined),
    );

    const activityType = await prisma.activityType.findUnique({
      where: { id: typeId },
    });

    if (!activityType) {
      return actionInternalError("Activity type doesnt exits");
    }

    if (activityType.isPublic && updateData.isPublic === false) {
      await deletePublicActivity(activityType.id);
    } else if (activityType.isPublic) {
      await publicServiceRequest({
        endpoint: "/public-activities",
        method: "PATCH",
        body: {
          activityTypePrivateId: typeId,
          ...updateData,
        },
      });
    } else {
      await createPublicActivity(user.publicId, activityType, false);
    }

    await prisma.activityType.update({
      where: { userId: user.id, id: typeId },
      data: updateData,
    });

    return actionSucess();
  } catch (err) {
    return actionInternalError(err);
  }
};

export const deleteActivityType = async (id: string): Promise<ActionResult> => {
  try {
    await deletePublicActivity(id);
    await prisma.activityType.delete({ where: { id } });

    return actionSucess();
  } catch (err) {
    return actionInternalError(err);
  }
};
