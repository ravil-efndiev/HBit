"use client";

import { useState } from "react";
import LayoutControl from "./LayoutControl";
import {
  Layout,
  LayoutPanelId,
  useLayout,
} from "./context/LayoutContext";

const panelLabels: Record<LayoutPanelId, string> = {
  dailyHabits: "Daily habits",
  activityCallendar: "Activity calendar",
  weeklyHabits: "Weekly habits",
};

const SidebarLayoutControls = () => {
  const { layout, setLayout } = useLayout();

  const toggleVisibility = (id: LayoutPanelId) => {
    setLayout((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, visible: !item.visible } : item,
      ),
    );
  };

  const movePanel = (id: LayoutPanelId, direction: "up" | "down") => {
    const index = layout.findIndex((item) => item.id === id);
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (index < 0 || targetIndex < 0 || targetIndex >= layout.length) {
      return;
    }

    setLayout((previous) => {
      const next = previous.slice();
      [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
      return next.map((item, order) => ({ ...item, order }));
    });
  };

  return (
    <div className="flex flex-col gap-2 p-3">
      {layout.map((item, index) => (
        <LayoutControl
          key={item.id}
          id={item.id}
          label={panelLabels[item.id]}
          visible={item.visible}
          canMoveUp={index > 0}
          canMoveDown={index < layout.length - 1}
          onToggleVisibility={toggleVisibility}
          onMove={movePanel}
        />
      ))}
    </div>
  );
};

export default SidebarLayoutControls;
