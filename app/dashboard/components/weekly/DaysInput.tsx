import { useRef } from "react";
import ModalWrapper from "../ModalWrapper";
import { dayNames } from "@/lib/dayNames";
import Image from "next/image";

interface Props {
  days: string[];
  onChange: (newDays: string[]) => void;
}

const formatDays = (days: string[]) => {
  if (days.length < 7) return;
  const formatted = [...days];
  formatted.push(formatted.shift()!);
  return formatted;
};

const DaysInput = ({ days, onChange }: Props) => {
  const daySelectRef = useRef<HTMLDialogElement>(null);

  const handleDayAdd = (day: string) => {
    if (days.includes(day)) {
      const newDays = [...days];
      newDays.splice(days.indexOf(day), 1);
      onChange(newDays);
    } else {
      onChange([...days, day]);
    }
  };

  return (
    <>
      <ModalWrapper dialogRef={daySelectRef} top="54vh" width={450}>
        <h5 className="text-xl mb-3">Days on which you'll do the habit</h5>
        <ul className="rounded-md p-3 bg-sky-100">
          {formatDays(dayNames)?.map((day, index) => (
            <li
              key={index}
              className={`cursor-pointer p-1 flex gap-1 ${
                days.includes(day)
                  ? "bg-sky-200"
                  : "bg-sky-100"
              }`}
              onClick={() => handleDayAdd(day)}
            >
              <p>{index + 1}.</p>
              <p>{day}</p>
              {days.includes(day) && (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              )}
            </li>
          ))}
        </ul>
      </ModalWrapper>
      <div className="flex items-center gap-2">
        <div
          className="btn hover:bg-(--col-accent-mint) w-20 cursor-pointer shadow-sm"
          onClick={() => daySelectRef.current?.showModal()}
        >
          <Image src="/calendar.svg" alt="icon" width={35} height={35} />
        </div>
        {days.length !== 0 && <p>({days.length} times a week)</p>}
      </div>
      <br />
    </>
  );
};

export default DaysInput;
