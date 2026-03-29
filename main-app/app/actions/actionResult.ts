import { EntryWithType } from "@/lib/types";
import { Notification } from "@prisma/client";

export type ActionResult = { ok: true } | { ok: false; error: string };
export type ActivityEntryActionResult =
  | { ok: true; entry: EntryWithType }
  | { ok: false; error: string };

export type AreUsersFriendsActionResult =
  | { ok: true; areFriends: boolean }
  | { ok: false; error: string };

export type NotificaionActionResult =
  | { ok: true; notification: Notification }
  | { ok: false; error: string };

export const actionSucess = (): ActionResult => ({ ok: true });

export const actionError = (error: string): ActionResult => {
  console.error(error);
  return {
    ok: false,
    error,
  };
};

export const actionInternalError = (error: any): ActionResult => {
  console.error(error);
  return {
    ok: false,
    error: "Internal server error",
  };
};

export const actionResultActivityEntry = (
  entry: EntryWithType,
): ActivityEntryActionResult => ({ ok: true, entry });

export const actionResultAreUsersFriends = (
  areFriends: boolean,
): AreUsersFriendsActionResult => ({ ok: true, areFriends });

export const actionResultNotification = (
  notification: Notification,
): NotificaionActionResult => ({ ok: true, notification });
