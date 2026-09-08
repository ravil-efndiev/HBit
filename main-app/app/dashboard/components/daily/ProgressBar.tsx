"use client";

import { useState } from "react";
import IncrementTimeButton from "./IncrementTimeButton";
import { getFormattedTime } from "./DailyHabitDisplay";
import { habitUpdate } from "@/lib/requests";
import { DailyHabitUpdateRequestBody } from "@/lib/requestBody";

interface Props {
  habitId: number;
  timeGoalMs: number;
  initialTimeSpentMs: number;
  goal: string;
}

const ProgressBar = ({
  habitId,
  timeGoalMs,
  initialTimeSpentMs,
  goal,
}: Props) => {
  const [timeSpentMs, setTimeSpentMs] = useState(initialTimeSpentMs);

  const handleIncrement = async (newValue: number) => {
    setTimeSpentMs(newValue);

    await habitUpdate(
      new DailyHabitUpdateRequestBody({
        habitId,
        timeSpent: newValue,
      }),
      false
    );
  };

  const calcProgress = () => (timeSpentMs / timeGoalMs) * 100;

  const timeSpent = getFormattedTime(timeSpentMs);

  return (
    <div className="flex-5">
      <p className="flex justify-between text-[1rem] font-light max-[449px]:flex-col max-[449px]:items-start max-[449px]:text-sm">
        <span className="flex gap-1">
          <span>Current progress</span>
          <span className="text-(--col-text-secondary)">
            {timeSpentMs < timeGoalMs ? (
              <>
                ({parseInt(timeSpent.hours) > 0 && `${timeSpent.hours}h `}
                {timeSpent.minutes}m)
              </>
            ) : (
              "(Done)"
            )}
          </span>
        </span>
        <span className="max-[999px]:inline min-[1000px]:hidden">
          goal: <span className="text-(--col-text-secondary)">{goal}</span>
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
