import { EntryWithType } from "@/lib/types";

export type ActionResult = { ok: true } | { ok: false; error: string };
export type ActivityEntryActionResult =
  | { ok: true; entry: EntryWithType }
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
  entry: EntryWithType
): ActivityEntryActionResult => ({ ok: true, entry });
