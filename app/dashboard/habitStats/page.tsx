import { requireSessionUser } from "@/lib/session";
import Breadcrumbs from "../components/Breadcrumbs";
import IconPathsProvider from "../components/context/IconPathsContext";
import { getHabitIconPaths } from "@/lib/iconPaths";
import { prisma } from "@/lib/prisma";

const StatisticsPage = async () => {
  const user = await requireSessionUser();
  const stats = await prisma.dailyHabitStat.findMany({
    where: { habit: { userId: user.id } },
    include: { habit: true },
  });

  return (
    <>
      <Breadcrumbs subpage="statistics" />
      <main>
        <div>
          {stats.map((stat) => (
            <div key={stat.id}>
              <p>{stat.habit.name}</p>
              <p>{stat.habit.details}</p>
              <p>{stat.timeSpent}</p>
              <p>{stat.completed ? "Completed" : "Not completed"}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default StatisticsPage;
