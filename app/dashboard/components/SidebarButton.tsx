"use client";

import { HabitPreset } from "@/lib/habitPresets";
import { useState } from "react";
import AddOrEditModal from "./AddOrEditModal";
import { habitCreate } from "@/lib/requests";

interface Props {
  preset: HabitPreset;
}

const SidebarButton = ({ preset }: Props) => {
  const [openTrigger, setOpenTrigger] = useState(0);

  return (
    <>
      <AddOrEditModal
        type="daily"
        openTrigger={openTrigger}
        onAdd={habitCreate}
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
