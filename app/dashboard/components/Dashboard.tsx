import SignoutButton from "@/components/SignoutButton";
import DailyHabitsPanel from "./daily/DailyHabitsPanel";
import { getHabitIconPaths } from "@/lib/iconPaths";
import IconPathsProvider from "./context/IconPathsContext";
import WeeklyHabitsPanel from "./weekly/WeeklyHabitsPanel";
import Link from "next/link";

const Dashboard = async () => {
  const habitIconPaths = getHabitIconPaths();

  return (
    <main className="flex-7 overflow-y-auto bg-[#e4e5e4]">
      {/* <SignoutButton /> */}
      <IconPathsProvider iconPaths={habitIconPaths}>
        <div className="max-w-[90%] mx-auto min-h-screen">
          <Link href="/dashboard/activities">Activities</Link>
          <DailyHabitsPanel />
          <WeeklyHabitsPanel />
        </div>
      </IconPathsProvider>
    </main>
  );
};

export default Dashboard;
