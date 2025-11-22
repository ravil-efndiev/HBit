"use client";

import { DailyHabitPreset } from "@/lib/habitPresets";
import React, { useState } from "react";
import AddOrEditModal from "./AddOrEditModal";

interface Props {
  preset: DailyHabitPreset;
}

const SidebarButton = ({ preset }: Props) => {
  const [openTrigger, setOpenTrigger] = useState(0);

  return (
    <>
      <AddOrEditModal
        openTrigger={openTrigger}
        onAddOrEdit={() => window.location.reload()}
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
