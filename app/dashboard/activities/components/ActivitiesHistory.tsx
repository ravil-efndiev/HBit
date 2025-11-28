"use client";

import { orderDataByDate } from "@/lib/misc";
import { useEntries } from "./context/EntriesProvider";
import Image from "next/image";
import { EntryWithType } from "@/lib/types";
import { reqDelete } from "@/lib/requests";

const ActivitiesHistory = () => {
  const { entries, setEntries } = useEntries();

  const getTime = (date: Date) => {
    const timeArr = date.toLocaleTimeString("cs-CZ").split(":");
    return `${timeArr[0]}:${timeArr[1]}`;
  };

  const handleDelete = async (entry: EntryWithType) => {
    setEntries((prev) => {
      const newEntries = [...prev];
      newEntries.splice(newEntries.indexOf(entry), 1);
      return newEntries;
    });

    try {
      await reqDelete("/api/activities/entry", { id: entry.id });
    } catch (err) {
      console.error(err);
    }
  };

  const entriesByDate = orderDataByDate(entries, true);

  return (
    <div className="panel">
      <ul>
        {entriesByDate.map((dateEntries, index) => (
          <li key={index}>
            <p>{dateEntries[0].date.toLocaleDateString("cs-CZ")}</p>
            {dateEntries.map((entry) => (
              <div key={entry.id} className="display-no-p font-light h-10">
                <div
                  className="w-8 h-full rounded-l-lg"
                  style={{ backgroundColor: entry.type.color }}
                ></div>
                <div className="p-3 flex w-full items-center">
                  <Image
                    src={entry.type.iconPath}
                    alt="icon"
                    width={30}
                    height={30}
                  />
                  <p className="ml-5">{entry.type.name}</p>
                  <p className="flex-1 ml-4 text-(--col-text-secondary)">
                    {entry.note}
                  </p>
                  <p>{getTime(entry.date)}</p>
                  <button
                    className="btn btn-sm btn-circle btn-warning btn-ghost text-lg ml-5"
                    onClick={() => handleDelete(entry)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivitiesHistory;
