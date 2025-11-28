import AddHabit from "@/dashboard/components/AddHabit";
import DailyHabitDisplay from "./DailyHabitDisplay";
import { requireSessionUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import StatsLink from "../HabitPanelBottom";
import HabitPanelBottom from "../HabitPanelBottom";

const DailyHabitsPanel = async () => {
  const currentUser = await requireSessionUser();
  const dailyHabits = await prisma.dailyHabit.findMany({
    where: { userId: currentUser.id },
    orderBy: { createdAt: "asc" },
  });

  return (
    <section>
      <h3 className="panel-title">Daily Habits</h3>
      <div className="panel">
        {dailyHabits.length > 0 ? (
          <ul className="list">
            {dailyHabits.map((habit) => (
              <li key={habit.id}>
                <DailyHabitDisplay habit={habit} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="habit-placeholder">
            You have no daily habits right now
          </p>
        )}
        <HabitPanelBottom type="daily" />
      </div>
    </section>
  );
};

export default DailyHabitsPanel;
