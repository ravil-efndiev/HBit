import AddHabit from "@/dashboard/components/AddHabit";
import DailyHabitDisplay from "./DailyHabitDisplay";
import { requireSessionUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";

const DailyHabitsPanel = async () => {
  const currentUser = await requireSessionUser();
  const dailyHabits = await prisma.dailyHabit.findMany({
    where: { userId: currentUser.id },
    orderBy: { createdAt: "asc" },
  });

  return (
    <section>
      <h3 className="panel-title">Daily Habits</h3>
      <ul className="list">
        {dailyHabits.map((habit) => (
          <li key={habit.id}>
            <DailyHabitDisplay habit={habit} />
          </li>
        ))}
      </ul>
      <AddHabit type="daily" />
    </section>
  );
};

export default DailyHabitsPanel;
