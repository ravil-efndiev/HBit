import { useState } from "react";
import Image from "next/image";
import { DailyHabit } from "@prisma/client";
import AddOrEditModal from "../AddOrEditModal";
import { deleteReq } from "@/lib/requests";

interface Props {
  onHabitEdit: (habit: DailyHabit) => void;
  initialHabit: DailyHabit;
}

const EditDailyHabit = ({ onHabitEdit, initialHabit }: Props) => {
  const [openTrigger, setOpenTrigger] = useState(0);

  const handleDelete = async () => {
    try {
      const data = await deleteReq("/api/habits/daily", { habitId: initialHabit.id });
      window.location.reload();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <AddOrEditModal
        onAddOrEdit={onHabitEdit}
        onDelete={handleDelete}
        openTrigger={openTrigger}
        initialHabitId={initialHabit.id}
        initialName={initialHabit.name}
        initialDetails={initialHabit.details}
        initialIconPath={initialHabit.iconPath}
        initialTimeGoal={initialHabit.timeGoal}
      />
      <div className="flex-1 flex justify-end">
        <button
          className="btn btn-ghost"
          onClick={() => setOpenTrigger((prev) => prev + 1)}
        >
          <Image src="three-dots.svg" alt="edit" width={30} height={30} />
        </button>
      </div>
    </>
  );
};

export default EditDailyHabit;
