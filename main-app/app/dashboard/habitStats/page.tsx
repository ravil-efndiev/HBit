import { requireSessionUser } from "@/lib/session";
import Breadcrumbs from "../components/Breadcrumbs";
import { prisma } from "@/lib/prisma";
import { orderDataByDate } from "@/lib/misc";
import { redis } from "@/lib/redis";
import { HabitStatWithHabit } from "@/lib/types";

const StatisticsPage = async () => {
  const user = await requireSessionUser();

  const cache = await redis.lrange(`habit-stats:${user.id}`, 0, -1);
  const stats = cache
    ? (cache
        .map((stat) => JSON.parse(stat))
        .map((stat: any) => ({
          ...stat,
          date: new Date(stat.date),
        })) as HabitStatWithHabit[])
    : await prisma.dailyHabitStat.findMany({
        where: { habit: { userId: user.id } },
        include: { habit: true },
      });

  const statsByDate = orderDataByDate(stats, false);

  return (
    <div className="w-full">
      <Breadcrumbs subpage="statistics" />
      <main>
        <div>
          {statsByDate.map((stats, index) => (
            <div
              key={index}
              className="collapse collapse-arrow border-base-300"
            >
              <input type="radio" name="my-accordion-1" />
              <div className="collapse-title flex">
                <p>{stats[0].date.toLocaleDateString("cs-CZ")}</p>
                <p>{stats.filter((stat) => stat.completed).length} completed</p>
              </div>
              <div className="collapse-content">
                {stats.map((stat) => (
                  <p key={stat.id}>{stat.habit.name}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default StatisticsPage;
