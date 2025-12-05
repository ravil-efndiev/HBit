"use client";

import { orderDataByDate } from "@/lib/misc";
import { useEntries } from "./context/EntriesProvider";
import { EntryWithType } from "@/lib/types";
import { reqDelete, reqPatch } from "@/lib/requests";
import EntryDisplay from "./EntryDisplay";

const ActivitiesHistory = () => {
  const { entries, setEntries } = useEntries();

  const handleDelete = async (entry: EntryWithType) => {
    setEntries((prev) => {
      const newEntries = [...prev];
      newEntries.splice(newEntries.indexOf(entry), 1);
      return newEntries.sort((a, b) => b.date.getTime() - a.date.getTime());
    });

    try {
      await reqDelete("/api/activities/entry", { id: entry.id });
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (
    entry: EntryWithType,
    note?: string,
    time?: string
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

    try {
      let newDate: Date | undefined;
      if (hm) {
        newDate = new Date(entry.date);
        newDate.setHours(hm[0], hm[1]);
      }
      await reqPatch("/api/activities/entry", {
        entryId: entry.id,
        dateStr: newDate?.toISOString(),
        note,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const entriesByDate = orderDataByDate(entries, true);

  return (
    <section className="panel ">
      <h1 className="panel-title">Activity history</h1>
      {entries.length !== 0 ? (
        <ul className="max-h-[80vh] overflow-y-auto px-3">
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
      ) : (
        <p className="text-center mt-5 mb-3">No activity entries yet</p>
      )}
    </section>
  );
};

export default ActivitiesHistory;
