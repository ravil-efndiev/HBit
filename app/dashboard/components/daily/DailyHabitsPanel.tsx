import AddDailyHabit from "./AddDailyHabit";
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
    <div className="bg-gray-200">
      <div className="flex">
        <h3>Daily Habits</h3>
        <AddDailyHabit />
      </div>
      <ul className="list">
        {dailyHabits.map((habit) => (
          <li key={habit.id}>
            <DailyHabitDisplay habit={habit} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DailyHabitsPanel;
