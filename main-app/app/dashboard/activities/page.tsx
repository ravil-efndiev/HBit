import ActivitiesHistory from "./components/ActivitiesHistory";
import AddActivityType from "./components/AddActivityType";
import IconPathsProvider from "../components/context/IconPathsContext";
import { getHabitIconPaths } from "@/lib/iconPaths";
import Breadcrumbs from "../components/Breadcrumbs";
import ActivityTypeList from "./components/ActivityTypeList";
import { prisma } from "@/lib/prisma";
import { requireSessionUser } from "@/lib/session";
import EntriesProvider from "./components/context/EntriesProvider";
import ActivityPieChart from "./components/ActivityPieChart";
import { getPieData } from "./math/pieData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Activities - HBit",
};

const ActivitiesPage = async () => {
  const habitIconPaths = getHabitIconPaths();

  const user = await requireSessionUser();

  const activityTypes = await prisma.activityType.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "asc" },
    include: { entries: true },
  });

  const allEntries = await prisma.activityEntry.findMany({
    where: { type: { userId: user.id } },
    orderBy: { date: "desc" },
    include: { type: true },
  });

  const latestEntries = (
    await Promise.all(
      activityTypes.map((type) =>
        prisma.activityEntry.findFirst({
          where: { typeId: type.id },
          orderBy: { date: "desc" },
        })
      )
    )
  ).filter((entry) => entry !== null);

  const pieData = getPieData(activityTypes);

  return (
    <>
      <Breadcrumbs subpage="activities" />
      <main className="flex-1">
        <div className="max-w-[96%] flex mx-auto">
          <IconPathsProvider iconPaths={habitIconPaths}>
            <EntriesProvider initialEntries={allEntries}>
              <AddActivityType user={user} />
              <div className="w-3/4 mx-auto flex flex-col gap-6">
                <ActivityTypeList
                  activityTypes={activityTypes}
                  latestEntries={latestEntries}
                />
                <ActivityPieChart data={pieData} />
                <ActivitiesHistory />
              </div>
            </EntriesProvider>
          </IconPathsProvider>
        </div>
      </main>
    </>
  );
};

export default ActivitiesPage;
