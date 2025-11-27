import { prisma } from "@/lib/prisma";
import { requireSessionUser } from "@/lib/session";
import WeeklyHabitDisplay from "./WeeklyHabitDisplay";
import { isDayNameToday } from "@/lib/dayNames";
import Image from "next/image";
import HabitPanelBottom from "../HabitPanelBottom";

const WeeklyHabitsPanel = async () => {
  const currentUser = await requireSessionUser();
  const weeklyHabits = await prisma.weeklyHabit.findMany({
    where: { userId: currentUser.id },
    orderBy: { createdAt: "asc" },
  });

  const today = weeklyHabits.filter((habit) => {
    for (const day of habit.days) {
      if (isDayNameToday(day)) return true;
    }
    return false;
  });

  return (
    <section className="my-7">
      <h3 className="panel-title">Weekly habits</h3>
      <div className="bg-[#ffffff64] p-3 rounded-lg">
        {today.length > 0 && (
          <>
            <h3 className="text-2xl">Today!</h3>
            <ul className="flex flex-wrap gap-3 mb-5">
              {today.map((habit) => (
                <li key={habit.id}>
                  <a href={`#${habit.id}`}>
                    <div className="habit-display hover:scale-[1.05] transition">
                      <Image
                        src={habit.iconPath}
                        alt="icon"
                        width={40}
                        height={40}
                      />
                      <div className="flex-2 mx-5">
                        <p className="text-lg">{habit.name}</p>
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
        {weeklyHabits.length > 0 ? (
          <>
            <h3 className="text-2xl">All weekly habits</h3>
            <ul className="list">
              {weeklyHabits.map((habit) => (
                <li key={habit.id}>
                  <WeeklyHabitDisplay habit={habit} />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="habit-placeholder">
            You have no weekly habits right now
          </p>
        )}
        <HabitPanelBottom type="weekly" />
      </div>
    </section>
  );
};

export default WeeklyHabitsPanel;
