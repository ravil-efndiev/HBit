import Breadcrumbs from "@/dashboard/components/Breadcrumbs";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ActivityLineChart from "./components/ActivitLineChart";
import ActivitiesHistory from "../components/ActivitiesHistory";
import EntriesProvider from "../components/context/EntriesProvider";
import ActivityHeading from "./components/ActivityHeading";
import { requireSessionUser } from "@/lib/session";
import { getFrequencyData } from "../math/frequencyData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Activities - HBit",
};

interface Props {
  params: Promise<{ activityId: string }>;
}

const ActivityTypePage = async ({ params }: Props) => {
  const { activityId } = await params;
  const user = await requireSessionUser();

  const activityType = await prisma.activityType.findUnique({
    where: { id: activityId, userId: user.id },
    include: { entries: true },
  });

  if (!activityType) {
    redirect("/dashboard/activities");
  }

  const data = getFrequencyData(activityType);

  const entriesWithTypeInfo = activityType.entries
    .map((entry) => ({
      ...entry,
      type: activityType,
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <>
      <Breadcrumbs subpage="activities" extra={activityType.name} />
      <main className="max-w-3/4 mx-auto flex flex-col gap-10">
        <ActivityHeading activityType={activityType} />
        <ActivityLineChart data={data} color={activityType.color} />
        <EntriesProvider initialEntries={entriesWithTypeInfo}>
          <ActivitiesHistory />
        </EntriesProvider>
      </main>
    </>
  );
};

export default ActivityTypePage;
