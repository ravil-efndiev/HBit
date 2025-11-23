"use client";

import { useState } from "react";
import Image from "next/image";
import AddOrEditModal from "../AddOrEditModal";
import { DailyHabitCreateRequestBody, habitCreate } from "@/lib/requests";

const AddDailyHabit = () => {
  const [openTrigger, setOpenTrigger] = useState(0);

  const handleHabitAdd = async (reqBody: DailyHabitCreateRequestBody) => {
    await habitCreate(reqBody);
  };

  return (
    <>
      <AddOrEditModal onAdd={handleHabitAdd} openTrigger={openTrigger} />
      <button
        className="btn btn-primary px-2 py-2 w-15 h-15"
        onClick={() => setOpenTrigger((prev) => prev + 1)}
      >
        <Image src="/plus.svg" alt="Plus" width={40} height={40} />
      </button>
    </>
  );
};

export default AddDailyHabit;
