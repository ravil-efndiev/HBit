import DailyHabitsPanel from "./daily/DailyHabitsPanel";
import { getHabitIconPaths } from "@/lib/iconPaths";
import IconPathsProvider from "./context/IconPathsContext";
import WeeklyHabitsPanel from "./weekly/WeeklyHabitsPanel";
import ActivityCalendar from "./ActivityCalendar";

const Dashboard = async () => {
  const habitIconPaths = getHabitIconPaths();

  return (
    <main className="w-full bg-gray-100">
      <IconPathsProvider iconPaths={habitIconPaths}>
        <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-12 p-4 sm:p-6 lg:p-8">
          <DailyHabitsPanel />
          <ActivityCalendar />
          <WeeklyHabitsPanel />
        </div>
      </IconPathsProvider>
    </main>
  );
};

export default Dashboard;
