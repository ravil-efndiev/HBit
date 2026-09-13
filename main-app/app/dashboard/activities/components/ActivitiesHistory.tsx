"use client";

import { orderDataByDate } from "@/lib/misc";
import { useEntries } from "./context/EntriesProvider";
import { EntryWithType } from "@/lib/types";
import EntryDisplay from "./EntryDisplay";
import {
  deleteActivityEntry,
  updateActivityEntry,
} from "@/actions/activityEntry.action";
import { fetchEntriesChunk } from "../action";
import { useState } from "react";

const ActivitiesHistory = () => {
  const { entries, setEntries } = useEntries();
  const [isMoreToLoad, setIsMoreToLoad] = useState(true);

  const handleDelete = async (entry: EntryWithType) => {
    setEntries((prev) => {
      const newEntries = [...prev];
      newEntries.splice(newEntries.indexOf(entry), 1);
      return newEntries.sort((a, b) => b.date.getTime() - a.date.getTime());
    });

    const res = await deleteActivityEntry(entry.id, entry.type.id);
    if (!res.ok) {
      console.error(res.error);
    }
  };

  const handleEdit = async (
    entry: EntryWithType,
    note?: string,
    time?: string,
  ) => {
    const hm = time?.split(":").map((s) => parseInt(s));

    setEntries((prev) => {
      const newEntries = [...prev];
      const currentIndex = newEntries.indexOf(entry);
      if (hm) {
        newEntries[currentIndex].date.setHours(hm[0], hm[1]);
      }
      if (note !== undefined) {
        newEntries[currentIndex].note = note;
      }
      return newEntries.sort((a, b) => b.date.getTime() - a.date.getTime());
    });

    let newDate: Date | undefined;
    if (hm) {
      newDate = new Date(entry.date);
      newDate.setHours(hm[0], hm[1]);
    }

    const res = await updateActivityEntry({
      entryId: entry.id,
      dateStr: newDate?.toISOString(),
      note,
    });
    if (!res.ok) {
      console.error(res.error);
    }
  };

  const entriesByDate = orderDataByDate(entries, true);

  const handleLoadMoreClick = async () => {
    const lastEntryDate = entries[entries.length - 1]?.date;
    const { chunk: nextEntries, endOfData } = await fetchEntriesChunk(
      15,
      lastEntryDate,
    );
    setEntries((prev) => [...prev, ...nextEntries]);
    if (endOfData) {
      return setIsMoreToLoad(false);
    }
  };

  return (
    <section className="panel">
      <h1 className="panel-title">Activity history</h1>
      {entries.length !== 0 ? (
        <>
          <ul className="px-3">
            {entriesByDate.map((dateEntries, index) => (
              <li key={index}>
                <p>{dateEntries[0].date.toLocaleDateString("cs-CZ")}</p>
                {dateEntries.map((entry) => (
                  <EntryDisplay
                    key={entry.id}
                    entry={entry}
                    onDelete={() => handleDelete(entry)}
                    onEdit={(note, time) => handleEdit(entry, note, time)}
                  />
                ))}
              </li>
            ))}
          </ul>
          {isMoreToLoad && (
            <div className="w-full flex justify-center">
              <button
                onClick={handleLoadMoreClick}
                className="text-lg text-(--col-primary-dark) mt-3 cursor-pointer hover:underline"
              >
                Load More
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-center mt-5 mb-3">No activity entries yet</p>
      )}
    </section>
  );
};

export default ActivitiesHistory;
