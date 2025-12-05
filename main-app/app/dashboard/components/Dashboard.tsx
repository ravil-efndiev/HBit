import DailyHabitsPanel from "./daily/DailyHabitsPanel";
import { getHabitIconPaths } from "@/lib/iconPaths";
import IconPathsProvider from "./context/IconPathsContext";
import WeeklyHabitsPanel from "./weekly/WeeklyHabitsPanel";
import ActivityCalendar from "./ActivityCalendar";

const Dashboard = async () => {
  const habitIconPaths = getHabitIconPaths();

  return (
    <main className="flex-7 overflow-y-auto bg-gray-100">
      <IconPathsProvider iconPaths={habitIconPaths}>
        <div className="max-w-[90%] mx-auto min-h-screen flex flex-col gap-12">
          <ActivityCalendar />
          <DailyHabitsPanel />
          <WeeklyHabitsPanel />
        </div>
      </IconPathsProvider>
    </main>
  );
};

export default Dashboard;
