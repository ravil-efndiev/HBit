import Image from "next/image";
import { EntryWithType } from "@/lib/types";
import { useEffect, useRef, useState } from "react";
import useClickAwayListener from "@/dashboard/components/hooks/useClickAwayListener";

const getTime = (date: Date) => {
  const timeArr = date.toLocaleTimeString("cs-CZ").split(":");
  return `${timeArr[0]}:${timeArr[1]}`;
};

interface Props {
  entry: EntryWithType;
  onDelete: () => void;
  onEdit: (note?: string, time?: string) => void;
}

const EntryDisplay = ({ entry, onDelete, onEdit }: Props) => {
  const [editMode, setEditMode] = useState(false);

  const displayRef = useRef<HTMLDivElement>(null);
  const noteInputRef = useRef<HTMLInputElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);

  useClickAwayListener(
    displayRef,
    () => {
      if (editMode) {
        onEdit(noteInputRef.current?.value, timeInputRef.current?.value);
        setEditMode(false);
      }
    },
    [editMode]
  );

  return (
    <div className="display-no-p font-light h-10" ref={displayRef}>
      <div
        className="w-8 h-full rounded-l-lg"
        style={{ backgroundColor: entry.type.color }}
      ></div>
      <div className="p-3 flex w-full items-center">
        <Image src={entry.type.iconPath} alt="icon" width={30} height={30} />
        <p className="ml-5 min-w-30">{entry.type.name}</p>
        {!editMode ? (
          <p className="flex-1 ml-4 text-(--col-text-secondary)">
            {entry.note}
          </p>
        ) : (
          <input
            type="text"
            className="input input-secondary mr-4 flex-5"
            placeholder="Entry note"
            ref={noteInputRef}
            defaultValue={entry.note}
          />
        )}
        {!editMode ? (
          <p>{getTime(entry.date)}</p>
        ) : (
          <input
            type="time"
            className="input input-secondary flex-1"
            ref={timeInputRef}
            defaultValue={getTime(entry.date)}
          />
        )}
        <button
          className="btn btn-sm btn-circle btn-ghost text-lg ml-5"
          onClick={() => setEditMode(true)}
        >
          <Image src="/wrench.svg" alt="edit" width={20} height={20} />
        </button>
        <button
          className="btn btn-sm btn-circle btn-warning btn-ghost text-lg ml-2"
          onClick={() => onDelete()}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default EntryDisplay;
