"use client";

import { useState } from "react";
import Image from "next/image";
import { DailyHabit, WeeklyHabit } from "@prisma/client";
import AddOrEditModal from "./AddOrEditModal";
import { habitDelete, habitUpdate } from "@/lib/requests";

interface Props {
  type: "daily" | "weekly";
  initialHabit: DailyHabit | WeeklyHabit;
}

const EditHabit = ({ type, initialHabit }: Props) => {
  const [openTrigger, setOpenTrigger] = useState(0);

  const handleDelete = async () => {
    await habitDelete(initialHabit.id, type);
  };

  return (
    <>
      <AddOrEditModal
        type={type}
        onEdit={habitUpdate}
        onDelete={handleDelete}
        openTrigger={openTrigger}
        initialHabitId={initialHabit.id}
        initialName={initialHabit.name}
        initialDetails={initialHabit.details}
        initialIconPath={initialHabit.iconPath}
        initialTimeGoal={
          type === "daily" ? (initialHabit as DailyHabit).timeGoal : undefined
        }
        initialDays={
          type === "weekly" ? (initialHabit as WeeklyHabit).days : undefined
        }
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

export default EditHabit;
