import Image from "next/image";
import { EntryWithType } from "@/lib/types";
import { useRef, useState } from "react";
import useClickAwayListener from "@/hooks/useClickAwayListener";

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
    <div className="display-no-p min-h-10 font-light" ref={displayRef}>
      <div
        className="w-8 shrink-0 self-stretch rounded-l-lg"
        style={{ backgroundColor: entry.type.color }}
      ></div>
      <div className="grid min-w-0 flex-1 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 p-3 sm:flex sm:w-full">
        <div className="flex min-w-0 items-center sm:contents">
          <Image src={entry.type.iconPath} alt="icon" width={30} height={30} />
          <p className="ml-5 min-w-0 truncate sm:min-w-30">{entry.type.name}</p>
        </div>
        {!editMode ? (
          <p className="col-start-1 row-start-2 min-w-0 truncate text-(--col-text-secondary) sm:order-0 sm:ml-4 sm:flex-1">
            {entry.note}
          </p>
        ) : (
          <input
            type="text"
            className="input input-secondary col-start-1 row-start-2 min-w-0 w-full sm:order-0 sm:mr-4 sm:flex-5"
            placeholder="Entry note"
            ref={noteInputRef}
            defaultValue={entry.note}
          />
        )}
        <div className="col-start-2 row-start-1">
          {!editMode ? (
            <p>{getTime(entry.date)}</p>
          ) : (
            <input
              type="time"
              className="input input-secondary w-auto sm:flex-1"
              ref={timeInputRef}
              defaultValue={getTime(entry.date)}
            />
          )}
        </div>
        <div className="col-start-2 row-start-2 flex justify-self-end sm:contents">
          <button
            className="btn btn-sm btn-circle btn-ghost text-lg sm:ml-5"
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
    </div>
  );
};

export default EntryDisplay;
