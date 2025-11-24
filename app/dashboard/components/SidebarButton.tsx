"use client";

import { HabitPreset } from "@/lib/habitPresets";
import { useState } from "react";
import AddOrEditModal from "./AddOrEditModal";
import { habitCreate } from "@/lib/requests";

interface Props {
  type: "daily" | "weekly";
  preset: HabitPreset;
}

const SidebarButton = ({ type, preset }: Props) => {
  const [openTrigger, setOpenTrigger] = useState(0);

  return (
    <>
      <AddOrEditModal
        type={type}
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
