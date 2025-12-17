import { ActivityEntry, ActivityType } from "@prisma/client";
import ActivityTypeDisplay from "./ActivityTypeDisplay";

interface Props {
  activityTypes: ActivityType[];
  latestEntries: ActivityEntry[];
}

const ActivityTypeList = async ({ activityTypes, latestEntries }: Props) => {
  return (
    <section className="panel">
      <h1 className="panel-title">Your activities</h1>
      {activityTypes.length !== 0 ? (
        <div className="p-1 bg-gray-100 rounded-sm">
          <ul className="max-h-[90vh] overflow-auto">
            {activityTypes.map((actType, index) => (
              <li className="display flex-col items-start" key={actType.id}>
                <ActivityTypeDisplay
                  activityType={actType}
                  latestEntry={latestEntries[index]}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <>
          <p className="text-center mt-5">You have no activities yet</p>
          <p className="text-center mb-3">Go ahead and add a new activity!</p>
        </>
      )}
    </section>
  );
};

export default ActivityTypeList;
