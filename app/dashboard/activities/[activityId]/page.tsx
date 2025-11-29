import Breadcrumbs from "@/dashboard/components/Breadcrumbs";
import { compareDates, getObjectUniqueDates } from "@/lib/misc";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ActivityCountChart from "./components/ActivityCountChart";
import ActivitiesHistory from "../components/ActivitiesHistory";
import EntriesProvider from "../components/context/EntriesProvider";
import ActivityHeading from "./components/ActivityHeading";

interface Props {
  params: Promise<{ activityId: string }>;
}

const ActivityTypePage = async ({ params }: Props) => {
  const { activityId } = await params;

  if (isNaN(parseInt(activityId))) {
    redirect("/dashboard/activities");
  }

  const activityType = await prisma.activityType.findUnique({
    where: { id: parseInt(activityId) },
    include: { entries: true },
  });

  if (!activityType) {
    redirect("/dashboard/activities");
  }

  const dates =
    activityType.entries.length > 0
      ? activityType.entries.map((e) => new Date(e.date))
      : [new Date()];
  const minDate = new Date(Math.min(...dates.map((d) => d.getTime())));
  const maxDate = new Date(Math.max(...dates.map((d) => d.getTime())));

  const uniqueDatesLength = getObjectUniqueDates(activityType.entries, true).length;

  minDate.setDate(
    minDate.getDate() - (8 - uniqueDatesLength > 0 ? 8 - uniqueDatesLength : 0)
  );

  const allDates: Date[] = [];
  for (let d = new Date(minDate); d <= maxDate; d.setDate(d.getDate() + 1)) {
    allDates.push(new Date(d));
  }

  const splitDate = (date: Date) =>
    date.toLocaleDateString("cs-CZ").split(". ");

  const data = allDates.map((date) => ({
    date: splitDate(date)[0] + "." + splitDate(date)[1],
    n: activityType.entries.filter((entry) =>
      compareDates(entry.date, date, true)
    ).length,
  }));

  const entriesWithTypeInfo = activityType.entries.map((entry) => ({
    ...entry,
    type: activityType,
  }));

  return (
    <>
      <Breadcrumbs subpage="activities" extra={activityType.name} />
      <main className="max-w-3/4 mx-auto flex flex-col gap-10">
        <ActivityHeading activityType={activityType} />
        <ActivityCountChart data={data} color={activityType.color} />
        <EntriesProvider initialEntries={entriesWithTypeInfo}>
          <ActivitiesHistory />
        </EntriesProvider>
      </main>
    </>
  );
};

export default ActivityTypePage;
