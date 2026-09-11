"use client";

import LayoutControl from "./LayoutControl";
import Loading from "@/components/Loading";
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

  const saveLayoutToLocalStorage = (newLayout: Layout) => {
    localStorage.setItem("layout", JSON.stringify(newLayout));
  }

  const toggleVisibility = (id: LayoutPanelId) => {
    setLayout((previous) => {
      if (!previous) {
        return previous;
      }

      const newLayout = previous.map((item) =>
        item.id === id ? { ...item, visible: !item.visible } : item,
      );
      saveLayoutToLocalStorage(newLayout);
      return newLayout;
    });
  };

  const movePanel = (id: LayoutPanelId, direction: "up" | "down") => {
    if (!layout) return;

    const index = layout.findIndex((item) => item.id === id);
    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (index < 0 || targetIndex < 0 || targetIndex >= layout.length) {
      return;
    }

    setLayout((previous) => {
      if (!previous) {
        return previous;
      }

      const next = previous.slice();
      [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
      const newLayout = next.map((item, order) => ({ ...item, order }));
      saveLayoutToLocalStorage(newLayout);
      return newLayout;
    });
  };

  if (!layout) {
    return <Loading label="Loading layout controls" className="min-h-24" />;
  }

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
