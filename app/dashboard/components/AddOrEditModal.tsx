import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useIconPaths } from "./context/IconPathsContext";
import { DailyHabitCreateRequestBody, DailyHabitUpdateRequestBody } from "@/lib/requests";
import {
  minutesHoursToMs,
  appendTimeZero,
  msToMinutesHours,
} from "@/lib/timeConverts";
import AddHabitPanelInput from "./AddHabitPanelInput";
import IconSelect from "./IconSelect";
import ModalWrapper from "./ModalWrapper";

interface Props {
  openTrigger: number;
  onAdd?: (body: DailyHabitCreateRequestBody) => void;
  onEdit?: (body: DailyHabitUpdateRequestBody) => void;
  onDelete?: () => void;
  initialName?: string;
  initialDetails?: string;
  initialIconPath?: string;
  initialTimeGoal?: number;
  initialHabitId?: number;
}

const AddOrEditModal = ({
  onAdd,
  onEdit,
  onDelete,
  openTrigger,
  initialName,
  initialDetails,
  initialIconPath,
  initialTimeGoal,
  initialHabitId,
}: Props) => {
  const editMode = initialHabitId !== undefined;

  const defaultIconPath = useIconPaths()[0];
  const [iconPath, setIconPath] = useState(initialIconPath || defaultIconPath);
  const [name, setName] = useState(initialName || "");
  const [desc, setDesc] = useState(initialDetails || "");
  const [timeGoal, setTimeGoal] = useState(
    msToMinutesHours(initialTimeGoal) || { hours: 0, minutes: 0 }
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
      return setError("Please enter a habit name");
    }

    if (timeGoal.minutes === 0 && timeGoal.hours === 0) {
      return setError("Please set your time goal");
    }

    const body = {
      name,
      details: desc,
      iconPath,
      timeGoal: minutesHoursToMs(timeGoal),
      ...(editMode && {
        habitId: initialHabitId,
      }),
    };

    if (editMode && onEdit) {
      onEdit(body);
    } else if (!editMode && onAdd) {
      onAdd(body);
    }

    modalRef.current?.close();
  };

  return (
    <ModalWrapper dialogRef={modalRef}>
      <h4 className="text-2xl mb-3">
        {!editMode ? "Add a new daily habit" : "Edit your habit"}
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
        initialIconPath={initialIconPath}
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
        {!editMode ? "Add" : "Edit"}
      </button>
      {editMode && onDelete && (
        <button className="btn btn-warning ml-3" onClick={() => onDelete()}>
          Delete
        </button>
      )}
      {error && <p className="text-(--col-peach) mt-1">{error}</p>}
    </ModalWrapper>
  );
};

export default AddOrEditModal;
