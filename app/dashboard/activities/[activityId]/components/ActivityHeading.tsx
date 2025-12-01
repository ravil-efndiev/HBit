import { ActivityType } from "@prisma/client";
import Image from "next/image";
import EditActivityType from "./EditActivityType";
import { getHabitIconPaths } from "@/lib/iconPaths";
import IconPathsProvider from "@/dashboard/components/context/IconPathsContext";

interface Props {
  activityType: ActivityType;
}

const ActivityHeading = ({ activityType }: Props) => {
  const iconPaths = getHabitIconPaths();

  return (
    <section className="panel text-center flex justify-center gap-10 items-center relative">
      <div
        className="rounded-full w-15 h-15 border-2 flex justify-center items-center"
        style={{ backgroundColor: activityType.color + "66" }}
      >
        <Image src={activityType.iconPath} alt="icon" width={35} height={35} />
      </div>
      <div className="max-w-1/4">
        <h1 className="panel-title">{activityType.name}</h1>
        <h2 className="text-xl">{activityType.details}</h2>
      </div>
      <IconPathsProvider iconPaths={iconPaths}>
        <EditActivityType initialActivityType={activityType} />
      </IconPathsProvider>
    </section>
  );
};

export default ActivityHeading;
