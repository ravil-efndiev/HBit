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
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-6 p-4 sm:p-6 lg:grid-cols-[minmax(15rem,20rem)_minmax(0,1fr)] lg:p-8">
          <IconPathsProvider iconPaths={habitIconPaths}>
            <EntriesProvider initialEntries={allEntries}>
              <AddActivityType />
              <div className="flex min-w-0 w-full flex-col gap-6">
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
