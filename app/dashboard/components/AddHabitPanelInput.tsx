import React from "react";

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: "name" | "desc";
}

const AddHabitPanelInput = ({ value, onChange, type }: Props) => {
  return (
    <input
      type="text"
      className="input input-primary mb-1.5 bg-(--col-primary-muted) shadow-xs"
      placeholder={type === "name" ? "Habit name *" : "Habit description"}
      onChange={onChange}
      value={value}
    />
  );
};

export default AddHabitPanelInput;
