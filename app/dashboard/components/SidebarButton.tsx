"use client";

import { DailyHabitPreset } from "@/lib/habitPresets";
import React, { useState } from "react";
import AddOrEditModal from "./AddOrEditModal";
import { DailyHabitCreateRequestBody, habitCreate } from "@/lib/requests";

interface Props {
  preset: DailyHabitPreset;
}

const SidebarButton = ({ preset }: Props) => {
  const [openTrigger, setOpenTrigger] = useState(0);

  const handleAdd = async (body: DailyHabitCreateRequestBody) => {
    await habitCreate(body);
  }

  return (
    <>
      <AddOrEditModal
        openTrigger={openTrigger}
        onAdd={handleAdd}
        initialName={preset.name}
        initialDetails={preset.detials}
        initialIconPath={preset.iconPath}
      />
      <button
        className="btn btn-ghost hover:bg-(--col-accent-mint)"
        onClick={() => setOpenTrigger((prev) => prev + 1)}
      >
        +
      </button>
    </>
  );
};

export default SidebarButton;
