import { appendTimeZero } from "@/lib/timeConverts";
import { ChangeEvent } from "react";

interface Props {
  timeGoal: { hours: number; minutes: number };
  onChange: (newTimeGoal: { hours: number; minutes: number }) => void;
}

const TimeGoalInput = ({ timeGoal, onChange }: Props) => {
  const handleInputChange =
    (which: "hours" | "minutes") => (e: ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(e.target.value);
      onChange({ ...timeGoal, [which]: value });
    };

  return (
    <>
      <p>How much time do you want to spend a day?</p>
      <div className="flex items-center mb-5">
        <input
          type="number"
          min="0"
          max="23"
          onChange={handleInputChange("hours")}
          value={appendTimeZero(timeGoal.hours)}
          className="w-20 input input-secondary shadow-sm"
        />
        <p className="text-(--col-text-secondary) mr-3 ml-1">h</p>
        <input
          type="number"
          min="0"
          max="59"
          onChange={handleInputChange("minutes")}
          value={appendTimeZero(timeGoal.minutes)}
          className="w-20 input input-secondary shadow-sm"
        />
        <p className="text-(--col-text-secondary) mr-3 ml-1">m</p>
      </div>
    </>
  );
};

export default TimeGoalInput;
