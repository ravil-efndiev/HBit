import { dailyHabitPresets } from "@/lib/habitPresets";
import Image from "next/image";
import SidebarButton from "./SidebarButton";
import getHabitIconPaths from "@/lib/getHabitIconPaths";
import IconPathsProvider from "./context/IconPathsContext";
import { requireSessionUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";

const Sidebar = async () => {
  const habitIconPaths = getHabitIconPaths();

  const user = await requireSessionUser();
  const dailyAll = await prisma.dailyHabit.findMany({
    where: { userId: user.id },
  });

  const dailyNotDone = dailyAll.filter(
    (habit) => habit.timeSpent < habit.timeGoal
  );

  return (
    <IconPathsProvider iconPaths={habitIconPaths}>
      <div className="flex-2 p-3 overflow-auto">
        <h3 className="sidebar-title bg-(--col-accent-sky)">
          {dailyNotDone.length > 0
            ? "Not yet finished"
            : "All today's goals done!"}
        </h3>
        <ul className="mb-8">
          {dailyNotDone.slice(0, 3).map((habit) => (
            <li key={habit.id} className="sidebar-li border-b-0">
              <Image src={habit.iconPath} alt="icon" width={30} height={30} />
              <p className="sidebar-li-text">{habit.name}</p>
            </li>
          ))}
          {dailyNotDone.length > 3 && (
            <p className="text-(--col-peach)">And more</p>
          )}
        </ul>
        <h3 className="sidebar-title">Any daily habit you'd like to add?</h3>
        <ul>
          {dailyHabitPresets.map((preset, index) => (
            <li key={index} className="sidebar-li">
              <Image src={preset.iconPath} alt="icon" width={30} height={30} />
              <p className="sidebar-li-text">{preset.name}</p>
              <SidebarButton preset={preset} />
            </li>
          ))}
        </ul>
      </div>
    </IconPathsProvider>
  );
};

export default Sidebar;
