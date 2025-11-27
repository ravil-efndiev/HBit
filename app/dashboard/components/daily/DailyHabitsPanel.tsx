import AddHabit from "@/dashboard/components/AddHabit";
import DailyHabitDisplay from "./DailyHabitDisplay";
import { requireSessionUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

const DailyHabitsPanel = async () => {
  const currentUser = await requireSessionUser();
  const dailyHabits = await prisma.dailyHabit.findMany({
    where: { userId: currentUser.id },
    orderBy: { createdAt: "asc" },
  });

  return (
    <section>
      <h3 className="panel-title">Daily Habits</h3>
      <div className="bg-[#ffffff64] p-3 rounded-lg">
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
        <div className="flex justify-between items-center mt-3">
          <Link className="btn btn-neutral bg-gray-700 flex text-lg" href="/dashboard/habitStats">
            <Image src="/stats.svg" alt="statistics" width={30} height={30} />
            <p className="text-(--col-background)">Stats</p>
          </Link>
          <AddHabit type="daily" />
        </div>
      </div>
    </section>
  );
};

export default DailyHabitsPanel;
