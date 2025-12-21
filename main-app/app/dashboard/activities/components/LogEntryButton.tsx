"use client";

import { createActivityEntry } from "@/actions/activityEntry.action";
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
    const res = await createActivityEntry({
      typeId: activityType.id,
      dateStr: new Date().toISOString(),
      note,
    });

    if (!res.ok) {
      return console.error(res.error);
    }

    const { entry } = res;
    entry.date = new Date(entry.date);
    onLog(entry);
  };

  return (
    <button className="btn btn-secondary mb-2" onClick={handleClick}>
      Log entry
    </button>
  );
};

export default LogEntryButton;
