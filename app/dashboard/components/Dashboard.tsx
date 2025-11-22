import { requireSessionUser } from "@/lib/session";
import SignoutButton from "@/components/SignoutButton";
import { prisma } from "@/lib/prisma";
import DailyHabitsPanel from "./daily/DailyHabitsPanel";
import getHabitIconPaths from "@/lib/getHabitIconPaths";
import IconPathsProvider from "./context/IconPathsContext";

const Dashboard = async () => {
  const currentUser = await requireSessionUser();
  const initialDailyHabits = await prisma.dailyHabit.findMany({
    where: { userId: currentUser.id },
    orderBy: { createdAt: "asc" },
  });

  const initialWeeklyHabits = await prisma.weeklyHabit.findMany({
    where: { userId: currentUser.id },
    orderBy: { createdAt: "asc" },
  });

  const habitIconPaths = getHabitIconPaths();

  return (
    <div className="flex-7">
      <SignoutButton />
      <IconPathsProvider iconPaths={habitIconPaths}>
        <DailyHabitsPanel initialDailyHabits={initialDailyHabits} />
      </IconPathsProvider>
    </div>
  );
};

export default Dashboard;
