"use server";

import { requireSessionUser } from "@/lib/session";
import {
  actionInternalError,
  ActionResult,
  actionResultNotification,
  actionSucess,
  NotificaionActionResult,
} from "./actionResult";
import { prisma } from "@/lib/prisma";

interface CreateNotificationArgs {
  type: string;
  payload: object;
}

export const createNotification = async ({
  type,
  payload,
}: CreateNotificationArgs): Promise<NotificaionActionResult> => {
  try {
    const user = await requireSessionUser();

    const notification = await prisma.notification.create({
      data: {
        userId: user.id,
        type,
        payload: JSON.stringify(payload),
      },
    });

    return actionResultNotification(notification);
  } catch (err) {
    return actionInternalError(err) as NotificaionActionResult;
  }
};

export const deleteNotification = async (id: string): Promise<ActionResult> => {
  try {
    await prisma.notification.delete({ where: { id } });
    return actionSucess();
  } catch (err) {
    return actionInternalError(err);
  }
};
