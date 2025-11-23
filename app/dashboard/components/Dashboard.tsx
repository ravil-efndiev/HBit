import SignoutButton from "@/components/SignoutButton";
import DailyHabitsPanel from "./daily/DailyHabitsPanel";
import getHabitIconPaths from "@/lib/getHabitIconPaths";
import IconPathsProvider from "./context/IconPathsContext";

const Dashboard = async () => {
  const habitIconPaths = getHabitIconPaths();

  return (
    <div className="flex-7">
      <SignoutButton />
      <IconPathsProvider iconPaths={habitIconPaths}>
        <DailyHabitsPanel />
      </IconPathsProvider>
    </div>
  );
};

export default Dashboard;
