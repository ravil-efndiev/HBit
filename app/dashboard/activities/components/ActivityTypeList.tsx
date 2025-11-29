import { ActivityEntry, ActivityType } from "@prisma/client";
import LogEntryButton from "./LogEntryButton";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import ActivityTypeDisplay from "./ActivityTypeDisplay";

interface Props {
  activityTypes: ActivityType[];
  latestEntries: ActivityEntry[];
}

const ActivityTypeList = async ({ activityTypes, latestEntries }: Props) => {
  return (
    <section className="panel">
      <h1 className="panel-title">Your activities</h1>
      <ul>
        {activityTypes.map((actType, index) => (
          <li className="display flex-col items-start" key={actType.id}>
            <ActivityTypeDisplay
              activityType={actType}
              latestEntry={latestEntries[index]}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ActivityTypeList;
