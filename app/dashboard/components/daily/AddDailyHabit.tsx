"use client";

import { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import ModalWrapper from "../ModalWrapper";
import IconSelect from "../IconSelect";
import { useIconPaths } from "../context/IconPathsContext";
import { post } from "@/lib/requests";
import { DailyHabit } from "@prisma/client";
import AddHabitPanelInput from "../AddHabitPanelInput";

interface Props {
  onHabitAdd: (habit: DailyHabit) => void;
}

const AddDailyHabitModal = ({ onHabitAdd }: Props) => {
  const defaultIconPath = useIconPaths()[0];
  const [iconPath, setIconPath] = useState(defaultIconPath);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [timeGoal, setTimeGoal] = useState({ hours: 0, minutes: 0 });
  const [error, setError] = useState<string | null>(null);

  const modalRef = useRef<HTMLDialogElement>(null);

  const handlePlusBtnClick = () => {
    modalRef.current?.showModal();
  };

  const appendTimeZero = (time: number): string => {
    return time < 10 ? `0${time}` : `${time}`;
  };

  const handleTimeInputChange =
    (which: "hours" | "minutes") => (e: ChangeEvent<HTMLInputElement>) => {
      if (which === "hours") {
        setTimeGoal((prev) => ({ ...prev, hours: parseInt(e.target.value) }));
      } else if (which === "minutes") {
        setTimeGoal((prev) => ({ ...prev, minutes: parseInt(e.target.value) }));
      }
    };

  const handleAddBtnClick = async () => {
    if (!name) {
      setError("Please enter a habit name");
      return;
    }

    if (timeGoal.minutes === 0 && timeGoal.hours === 0) {
      setError("Please enter your time goal");
      return;
    }

    const timeGoalMs =
      timeGoal.minutes * 60 * 1000 + timeGoal.hours * 60 * 60 * 1000;

    try {
      const resData = await post("/api/habits/daily", {
        name,
        desc,
        iconPath,
        timeGoal: timeGoalMs,
      });

      const createdHabit = resData.newHabit;

      onHabitAdd(createdHabit);
      modalRef.current?.close();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <ModalWrapper dialogRef={modalRef}>
        <h4 className="text-2xl mb-3">Add a new daily habit</h4>
        <AddHabitPanelInput
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="name"
        />
        <AddHabitPanelInput
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          type="desc"
        />
        <IconSelect onSelect={(path) => setIconPath(path)} />
        <p>How much time do you want to spend a day?</p>
        <div className="flex items-center mb-5">
          <input
            type="number"
            min="0"
            max="23"
            onChange={handleTimeInputChange("hours")}
            value={appendTimeZero(timeGoal.hours)}
            className="w-20 input input-secondary shadow-sm"
          />
          <p className="text-(--col-text-secondary) mr-3 ml-1">h</p>
          <input
            type="number"
            min="0"
            max="59"
            onChange={handleTimeInputChange("minutes")}
            value={appendTimeZero(timeGoal.minutes)}
            className="w-20 input input-secondary shadow-sm"
          />
          <p className="text-(--col-text-secondary) mr-3 ml-1">m</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddBtnClick}>
          Add
        </button>
        {error && <p className="text-(--col-peach) mt-1">{error}</p>}
      </ModalWrapper>
      <button
        className="btn btn-primary px-2 py-2 w-15 h-15"
        onClick={handlePlusBtnClick}
      >
        <Image src="/plus.svg" alt="Plus" width={40} height={40} />
      </button>
    </>
  );
};

export default AddDailyHabitModal;
