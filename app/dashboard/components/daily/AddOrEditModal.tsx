import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useIconPaths } from "../context/IconPathsContext";
import { patch, post } from "@/lib/requests";
import {
  minutesHoursToMs,
  appendTimeZero,
  msToMinutesHours,
} from "@/lib/timeConverts";
import AddHabitPanelInput from "../AddHabitPanelInput";
import IconSelect from "../IconSelect";
import ModalWrapper from "../ModalWrapper";
import { DailyHabit } from "@prisma/client";

interface Props {
  openTrigger: number;
  onAddOrEdit: (newHabit: DailyHabit) => void;
  initialHabit?: DailyHabit;
  onDelete?: () => void;
}

const AddOrEditModal = ({
  onAddOrEdit,
  onDelete,
  openTrigger,
  initialHabit,
}: Props) => {
  const defaultIconPath = useIconPaths()[0];
  const [iconPath, setIconPath] = useState(
    initialHabit?.iconPath || defaultIconPath
  );
  const [name, setName] = useState(initialHabit?.name || "");
  const [desc, setDesc] = useState(initialHabit?.details || "");
  const [timeGoal, setTimeGoal] = useState(
    msToMinutesHours(initialHabit?.timeGoal) || { hours: 0, minutes: 0 }
  );
  const [error, setError] = useState<string | null>(null);

  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (openTrigger > 0) modalRef.current?.showModal();
  }, [openTrigger]);

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

    try {
      const body = {
        name,
        desc,
        iconPath,
        timeGoal: minutesHoursToMs(timeGoal),
        ...(initialHabit && {
          habitId: initialHabit.id,
        }),
      };
      const resData = !initialHabit
        ? await post("/api/habits/daily", body)
        : await patch("/api/habits/daily", body);

      const createdOrPatched = initialHabit
        ? resData.patchedHabit
        : resData.newHabit;

      onAddOrEdit(createdOrPatched);
      modalRef.current?.close();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ModalWrapper dialogRef={modalRef}>
      <h4 className="text-2xl mb-3">
        {!initialHabit ? "Add a new daily habit" : "Edit your habit"}
      </h4>
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
      <IconSelect
        onSelect={(path) => setIconPath(path)}
        initialIconPath={initialHabit?.iconPath}
      />
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
        {!initialHabit ? "Add" : "Edit"}
      </button>
      {initialHabit && onDelete && (
        <button className="btn btn-warning ml-3" onClick={() => onDelete()}>Delete</button>
      )}
      {error && <p className="text-(--col-peach) mt-1">{error}</p>}
    </ModalWrapper>
  );
};

export default AddOrEditModal;
