"use client";

import { ActivityEntry, ActivityType } from "@prisma/client";
import Image from "next/image";
import LogEntryButton from "./LogEntryButton";
import { useState } from "react";
import { useEntries } from "./context/EntriesProvider";
import { EntryWithType } from "@/lib/types";
import BookmarkIcon from "./BookmarkIcon";

interface Props {
  activityType: ActivityType;
  latestEntry: ActivityEntry;
}

const ActivityTypeDisplay = ({ activityType, latestEntry }: Props) => {
  const [note, setNote] = useState("");
  const { entries, setEntries } = useEntries();

  const handleEntryLog = (newEntry: EntryWithType) => {
    setNote("");
    setEntries([newEntry, ...entries]);
  };

  return (
    <>
      <div className="flex w-full relative pt-3 mb-2">
        <div className="absolute -top-2">
          <BookmarkIcon color={activityType.color} />
        </div>
        <Image src={activityType.iconPath} className="my-auto" alt="icon" width={50} height={50} />
        <div className="flex-3 ml-5 my-auto">
          <p className="text-lg">{activityType.name}</p>
          <p className="text-(--col-text-secondary) max-w-3/4">
            {activityType.details}
          </p>
        </div>
        <textarea
          name="note"
          className="textarea textarea-primary flex-4 bg-emerald-50 max-h-full mr-8"
          placeholder="Note for the entry..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
        ></textarea>
        <p className="font-light flex-2">
          {latestEntry ? (
            <>
              Last entry:{" "}
              <span className="text-(--col-primary-dark)">
                {latestEntry.date.toLocaleDateString("cs-CZ")}
              </span>
            </>
          ) : (
            "No entries yet"
          )}
        </p>
      </div>
      <LogEntryButton
        activityType={activityType}
        note={note}
        onLog={handleEntryLog}
      />
    </>
  );
};

export default ActivityTypeDisplay;
