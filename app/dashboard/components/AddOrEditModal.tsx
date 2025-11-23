import { useEffect, useMemo, useRef, useState } from "react";
import { useIconPaths } from "./context/IconPathsContext";
import { minutesHoursToMs, msToMinutesHours } from "@/lib/timeConverts";
import AddHabitPanelInput from "./AddHabitPanelInput";
import IconSelect from "./IconSelect";
import ModalWrapper from "./ModalWrapper";
import TimeGoalInput from "./daily/TimeGoalInput";
import DaysInput from "./weekly/DaysInput";
import {
  DailyHabitCreateRequestBody,
  DailyHabitUpdateRequestBody,
  WeeklyHabitCreateRequestBody,
  WeeklyHabitUpdateRequestBody,
} from "@/lib/requestBody";

interface Props {
  openTrigger: number;
  type: "daily" | "weekly";
  onAdd?: (
    body: DailyHabitCreateRequestBody | WeeklyHabitCreateRequestBody
  ) => void;
  onEdit?: (
    body: DailyHabitUpdateRequestBody | WeeklyHabitUpdateRequestBody
  ) => void;
  onDelete?: () => void;
  initialName?: string;
  initialDetails?: string;
  initialIconPath?: string;
  initialTimeGoal?: number;
  initialDays?: string[];
  initialHabitId?: number;
}

const AddOrEditModal = ({
  openTrigger,
  type,
  onAdd,
  onEdit,
  onDelete,
  initialName,
  initialDetails,
  initialIconPath,
  initialTimeGoal,
  initialDays,
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
  const [days, setDays] = useState(initialDays || []);
  const [error, setError] = useState<string | null>(null);

  const modalRef = useRef<HTMLDialogElement>(null);

  const uiData =
    type === "daily"
      ? {
          mainTitleAdd: "Add a new daily habit",
          mainTitleEdit: "Edit your habit",
          specificInputComponent: (
            <TimeGoalInput
              timeGoal={timeGoal}
              onChange={(newTimeGoal) => setTimeGoal(newTimeGoal)}
            />
          ),
        }
      : {
          mainTitleAdd: "Add a new weekly habit",
          mainTitleEdit: "Edit your habit",
          specificInputComponent: (
            <DaysInput days={days} onChange={(newDays) => setDays(newDays)} />
          ),
        };

  useEffect(() => {
    if (openTrigger > 0) modalRef.current?.showModal();
  }, [openTrigger]);

  const handleAddBtnClick = async () => {
    if (!name) return setError("Please enter a habit name");
    if (name.length > 20) return setError("Name is too long");
    if (desc.length > 80) return setError("Description is too long");

    if (type === "daily" && timeGoal.minutes === 0 && timeGoal.hours === 0) {
      return setError("Please set your time goal");
    }

    if (type === "weekly" && days.length === 0) {
      return setError("Please select days on which you'll do the habit");
    }

    if (type === "daily") {
      const body = editMode
        ? new DailyHabitUpdateRequestBody({
            habitId: initialHabitId,
            name,
            details: desc,
            iconPath,
            timeGoal: minutesHoursToMs(timeGoal),
          })
        : new DailyHabitCreateRequestBody(
            name,
            desc,
            iconPath,
            minutesHoursToMs(timeGoal)
          );

      if (body instanceof DailyHabitUpdateRequestBody && onEdit) {
        onEdit(body);
      } else if (body instanceof DailyHabitCreateRequestBody && onAdd) {
        onAdd(body);
      }
    } else if (type === "weekly") {
      const body = editMode
        ? new WeeklyHabitUpdateRequestBody({
            habitId: initialHabitId,
            name,
            details: desc,
            iconPath,
            days,
          })
        : new WeeklyHabitCreateRequestBody(name, desc, iconPath, days);

      if (body instanceof WeeklyHabitUpdateRequestBody && onEdit) {
        onEdit(body);
      } else if (body instanceof WeeklyHabitCreateRequestBody && onAdd) {
        onAdd(body);
      }
    }
    modalRef.current?.close();
  };

  return (
    <ModalWrapper dialogRef={modalRef}>
      <h4 className="text-2xl mb-3">
        {!editMode ? uiData.mainTitleAdd : uiData.mainTitleEdit}
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
      {uiData.specificInputComponent}
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
