import { prisma } from "@/lib/prisma";
import { requireSessionUser } from "@/lib/session";

const ActivitiesHistory = async () => {
  const user = await requireSessionUser();
  const allActivities = await prisma.activityEntry.findMany({
    where: { type: { userId: user.id } },
    orderBy: { date: "asc" },
    include: { type: true },
  });

  return (
    <div className="flex-4">
      <ul>
        {allActivities.map((activity) => (
          <li key={activity.id}>{activity.type.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ActivitiesHistory;
