import { prisma } from "@/lib/prisma";
import { requireSessionUser } from "@/lib/session";
import WeeklyHabitDisplay from "./WeeklyHabitDisplay";
import { isDayNameToday } from "@/lib/dayNames";
import AddHabit from "@/dashboard/components/AddHabit";
import Image from "next/image";

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
    <section>
      <div className="flex">
        <h3>Weekly habits</h3>
        <AddHabit type="weekly" />
      </div>
      <h3>Today!</h3>
      <ul className="flex flex-wrap gap-3">
        {today.map((habit) => (
          <li key={habit.id}>
            <a href={`#${habit.id}`}>
              <div className="habit-display hover:scale-[1.05] transition">
                <Image src={habit.iconPath} alt="icon" width={40} height={40} />
                <div className="flex-2 mx-5">
                  <p className="text-lg">{habit.name}</p>
                  <p className="text-(--col-text-secondary)">{habit.details}</p>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
      <h3>All weekly habits</h3>
      <ul className="list">
        {weeklyHabits.map((habit) => (
          <li key={habit.id}>
            <WeeklyHabitDisplay habit={habit} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default WeeklyHabitsPanel;
