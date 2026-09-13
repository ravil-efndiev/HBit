"use client";

import { ActivityEntry, ActivityType, ActivityVisibility } from "@prisma/client";
import Image from "next/image";
import LogEntryButton from "./LogEntryButton";
import { useState } from "react";
import { useEntries } from "./context/EntriesProvider";
import { EntryWithType } from "@/lib/types";
import BookmarkIcon from "./BookmarkIcon";
import Link from "next/link";

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
      <div className="relative grid w-full grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-2 pt-3 min-[1200px]:mb-2 min-[1200px]:flex min-[1200px]:flex-wrap">
        <div className="absolute -top-2">
          <BookmarkIcon color={activityType.color} />
        </div>
        <div className="col-span-2 flex items-center justify-center gap-1 max-[1199px]:flex-wrap min-[1200px]:contents">
          <Image
            src={activityType.iconPath}
            className="my-auto"
            alt="icon"
            width={50}
            height={50}
          />
          <div className="my-auto min-w-0 min-[1200px]:ml-5 min-[1200px]:flex-3">
            <p className="flex justify-center gap-3 text-lg min-[1200px]:justify-start">
              {activityType.name}
              {activityType.visibility == ActivityVisibility.PUBLIC && (
                <Image src="/globe.svg" width={20} height={20} alt="public" />
              )}
              {activityType.visibility == ActivityVisibility.FRIENDS_ONLY && (
                <Image src="/star.svg" width={20} height={20} alt="friends-only" />
              )}
            </p>
            <p className="mx-auto max-w-3/4 text-(--col-text-secondary) min-[1200px]:mx-0">
              {activityType.details}
            </p>
          </div>
        </div>
        <div className="col-span-2 grid w-full max-w-3xl grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-2 justify-self-center px-8 max-sm:px-0 min-[1200px]:contents">
          <textarea
            name="note"
            className="textarea textarea-primary col-span-2 row-start-1 w-full bg-emerald-50 max-h-full min-[1200px]:col-auto min-[1200px]:row-auto min-[1200px]:mr-8 min-[1200px]:flex-4"
            placeholder="Note for the entry..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>
          <p className="col-start-2 row-start-2 self-center justify-self-end text-right font-light max-sm:col-span-2 max-sm:col-start-1 max-sm:row-start-3 min-[1200px]:col-auto min-[1200px]:row-auto min-[1200px]:flex-2">
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
          <div className="col-start-1 row-start-2 flex w-full justify-start gap-3 max-sm:col-span-2 max-sm:justify-between min-[1200px]:col-auto min-[1200px]:row-auto min-[1200px]:basis-full">
            <LogEntryButton
              activityType={activityType}
              note={note}
              onLog={handleEntryLog}
            />
            <Link
              className="btn btn-outline border-gray-700 hover:bg-gray-300 flex"
              href={`/dashboard/activities/${activityType.id}`}
            >
              <Image src="/stats.svg" alt="statistics" width={20} height={20} />
              <p className="text-(--col-text-primary)">Stats</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActivityTypeDisplay;
