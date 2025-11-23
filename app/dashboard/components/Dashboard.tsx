import SignoutButton from "@/components/SignoutButton";
import DailyHabitsPanel from "./daily/DailyHabitsPanel";
import getHabitIconPaths from "@/lib/getHabitIconPaths";
import IconPathsProvider from "./context/IconPathsContext";
import WeeklyHabitsPanel from "./weekly/WeeklyHabitsPanel";

const Dashboard = async () => {
  const habitIconPaths = getHabitIconPaths();

  return (
    <main className="flex-7 overflow-y-auto h-screen bg-gray-200">
      <SignoutButton />
      <IconPathsProvider iconPaths={habitIconPaths}>
        <div className="max-w-[90%] mx-auto">
          <DailyHabitsPanel />
          <WeeklyHabitsPanel />
        </div>
      </IconPathsProvider>
    </main>
  );
};

export default Dashboard;
