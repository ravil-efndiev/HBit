"use client";

import { DailyHabit } from "@prisma/client";
import { useState } from "react";
import AddDailyHabit from "./AddDailyHabit";

interface Props {
  initialDailyHabits: DailyHabit[];
}

const DailyHabitsDisplay = ({ initialDailyHabits }: Props) => {
  const [dailyHabits, setDailyHabits] = useState(initialDailyHabits);
  return (
    <>
      <div className="bg-gray-200">
        <div className="flex">
          <h3>Daily Habits</h3>
          <AddDailyHabit
            onHabitAdd={(habit) => setDailyHabits((prev) => [...prev, habit])}
          />
        </div>
        <ul className="list">
          {dailyHabits.map((habit) => (
            <li key={habit.id}>{habit.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default DailyHabitsDisplay;
