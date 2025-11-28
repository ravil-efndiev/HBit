import ActivitiesHistory from "./components/ActivitiesHistory";
import AddActivityType from "./components/AddActivityType";
import IconPathsProvider from "../components/context/IconPathsContext";
import { getHabitIconPaths } from "@/lib/iconPaths";
import Breadcrumbs from "../components/Breadcrumbs";
import ActivityTypeList from "./components/ActivityTypeList";
import { prisma } from "@/lib/prisma";
import { requireSessionUser } from "@/lib/session";
import EntriesProvider from "./components/context/EntriesProvider";

interface Props {
  searchParams: Promise<{
    activityId?: number;
  }>;
}

const ActivitiesPage = async ({ searchParams }: Props) => {
  const { activityId } = await searchParams;
  const habitIconPaths = getHabitIconPaths();
  console.log(habitIconPaths);

  const user = await requireSessionUser();

  const activityTypes = await prisma.activityType.findMany({
    where: { userId: user.id },
  });

  const allEntries = await prisma.activityEntry.findMany({
    where: { type: { userId: user.id } },
    orderBy: { date: "desc" },
    include: { type: true },
  });

  console.log(allEntries);

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

  return (
    <div className="bg-gray-100">
      <Breadcrumbs
        subpage="activities"
        extra={activityId ? `Some activity` : undefined}
      />
      <main className="flex-1">
        <div className="max-w-[96%] flex mx-auto">
          <IconPathsProvider iconPaths={habitIconPaths}>
            <EntriesProvider initialEntries={allEntries}>
              <AddActivityType />
              <div className="w-3/4 mx-auto flex flex-col gap-6">
                <ActivityTypeList
                  activityTypes={activityTypes}
                  latestEntries={latestEntries}
                />
                <ActivitiesHistory />
              </div>
            </EntriesProvider>
          </IconPathsProvider>
        </div>
      </main>
    </div>
  );
};

export default ActivitiesPage;
