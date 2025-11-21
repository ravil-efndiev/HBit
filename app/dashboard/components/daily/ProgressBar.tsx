import { useState } from "react";
import IncrementTimeButton from "./IncrementTimeButton";
import { patch } from "@/lib/requests";
import { getFormattedTime } from "./DailyHabitDisplay";

interface Props {
  habitId: number;
  timeGoalMs: number;
  initialTimeSpentMs: number;
}

const ProgressBar = ({ habitId, timeGoalMs, initialTimeSpentMs }: Props) => {
  const [timeSpentMs, setTimeSpentMs] = useState(initialTimeSpentMs);

  const handleIncrement = async (newValue: number) => {
    setTimeSpentMs(newValue);

    try {
      const data = await patch("/api/habits/daily", {
        habitId,
        timeSpent: newValue,
      });

      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  const calcProgress = () => (timeSpentMs / timeGoalMs) * 100;

  const timeSpent = getFormattedTime(timeSpentMs);

  return (
    <div className="flex-5">
      <p className="text-[1rem]">
        Daily progress{" "}
        <span className="text-(--col-text-secondary)">
          ({parseInt(timeSpent.hours) > 0 && `${timeSpent.hours}h `}
          {timeSpent.minutes}m)
        </span>
      </p>
      <progress
        className="progress progress-primary"
        max="100"
        value={`${calcProgress()}`}
      ></progress>
      <div className="flex">
        <IncrementTimeButton
          currentValueMs={timeSpentMs}
          amountMs={60_000}
          onIncrement={handleIncrement}
        />
        <IncrementTimeButton
          currentValueMs={timeSpentMs}
          amountMs={5 * 60_000}
          onIncrement={handleIncrement}
        />
        <IncrementTimeButton
          currentValueMs={timeSpentMs}
          amountMs={10 * 60_000}
          onIncrement={handleIncrement}
        />
        <IncrementTimeButton
          currentValueMs={timeSpentMs}
          amountMs={60 * 60_000}
          onIncrement={handleIncrement}
        />
        <button
          className="btn btn-ghost btn-warning text-xl"
          onClick={() => handleIncrement(0)}
        >
          ⟳
        </button>
      </div>
    </div>
  );
};

export default ProgressBar;
