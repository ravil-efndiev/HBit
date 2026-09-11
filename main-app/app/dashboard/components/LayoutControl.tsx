"use client";

import { ArrowDown, ArrowUp, Eye, EyeOff } from "lucide-react";
import { LayoutPanelId } from "./context/LayoutContext";

interface Props {
  id: LayoutPanelId;
  label: string;
  visible: boolean;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onToggleVisibility: (id: LayoutPanelId) => void;
  onMove: (id: LayoutPanelId, direction: "up" | "down") => void;
}

const buttonStyle = "btn btn-ghost rounded-lg p-1.5 transition-colors disabled:opacity-40";

const LayoutControl = ({
  id,
  label,
  visible,
  canMoveUp,
  canMoveDown,
  onToggleVisibility,
  onMove,
}: Props) => {
  return (
    <div className="flex items-center gap-2 rounded-xl p-2 shadow-md backdrop-blur-sm ">
      <button
        type="button"
        className="flex min-w-0 flex-1 items-center gap-2 rounded-lg px-2 py-1 
                   text-left transition-colors hover:cursor-pointer"
        onClick={() => onToggleVisibility(id)}
        aria-pressed={visible}
        title={visible ? `Hide ${label}` : `Show ${label}`}
      >
        {visible ? <Eye size={16} /> : <EyeOff size={16} />}
        <span >{label}</span>
      </button>
      <div className="flex shrink-0 gap-1">
        <button
          type="button"
          className={buttonStyle}
          onClick={() => onMove(id, "up")}
          disabled={!canMoveUp}
          aria-label={`Move ${label} up`}
        >
          <ArrowUp size={16} />
        </button>
        <button
          type="button"
          className={buttonStyle}
          onClick={() => onMove(id, "down")}
          disabled={!canMoveDown}
          aria-label={`Move ${label} down`}
        >
          <ArrowDown size={16} />
        </button>
      </div>
    </div>
  );
};

export default LayoutControl;
