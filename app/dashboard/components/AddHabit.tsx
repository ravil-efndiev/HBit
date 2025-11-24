"use client";

import { habitCreate } from "@/lib/requests";
import { useState } from "react";
import AddOrEditModal from "./AddOrEditModal";
import Image from "next/image";

interface Props {
  type: "daily" | "weekly";
}

const AddWeeklyHabit = ({ type }: Props) => {
  const [openTrigger, setOpenTrigger] = useState(0);

  return (
    <>
      <AddOrEditModal
        type={type}
        onAdd={habitCreate}
        openTrigger={openTrigger}
      />
      <div className="flex w-full justify-end mt-3">
        <button
          className="btn btn-primary px-2 py-2 w-15 h-15"
          onClick={() => setOpenTrigger((prev) => prev + 1)}
        >
          <Image src="/plus.svg" alt="Plus" width={40} height={40} />
        </button>
      </div>
    </>
  );
};

export default AddWeeklyHabit;
