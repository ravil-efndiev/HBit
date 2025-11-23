"use client";

import { useState } from "react";
import Image from "next/image";
import { DailyHabit } from "@prisma/client";
import AddOrEditModal from "../AddOrEditModal";
import {
  DailyHabitUpdateRequestBody,
  habitDelete,
  habitUpdate,
} from "@/lib/requests";

interface Props {
  initialHabit: DailyHabit;
}

const EditDailyHabit = ({ initialHabit }: Props) => {
  const [openTrigger, setOpenTrigger] = useState(0);

  const handleDelete = async () => {
    await habitDelete(initialHabit.id);
  };

  const handleEdit = async (reqBody: DailyHabitUpdateRequestBody) => {
    await habitUpdate(reqBody);
  };

  return (
    <>
      <AddOrEditModal
        onEdit={handleEdit}
        onDelete={handleDelete}
        openTrigger={openTrigger}
        initialHabitId={initialHabit.id}
        initialName={initialHabit.name}
        initialDetails={initialHabit.details}
        initialIconPath={initialHabit.iconPath}
        initialTimeGoal={initialHabit.timeGoal}
      />
      <div className="ml-auto flex">
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
