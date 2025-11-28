"use client";

import { reqPost } from "@/lib/requests";
import { EntryWithType } from "@/lib/types";
import { ActivityType } from "@prisma/client";

interface Props {
  activityType: ActivityType;
  note: string;
  onLog: (newEntry: EntryWithType) => void;
}

const LogEntryButton = ({ activityType, note, onLog }: Props) => {
  const handleClick = async () => {
    try {
      const { newActivityEntry } = await reqPost("/api/activities/entry", {
        typeId: activityType.id,
        dateStr: new Date().toISOString(),
        note,
      });

      newActivityEntry.date = new Date(newActivityEntry.date);

      onLog(newActivityEntry);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button className="btn btn-secondary mb-2" onClick={handleClick}>
      Log entry
    </button>
  );
};

export default LogEntryButton;
