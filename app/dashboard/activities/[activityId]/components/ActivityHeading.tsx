import { ActivityType } from "@prisma/client";
import Image from "next/image";

interface Props {
  activityType: ActivityType;
}

const ActivityHeading = ({ activityType }: Props) => {
  return (
    <section className="panel text-center flex justify-center gap-10 items-center">
      <div
        className="rounded-full w-15 h-15 border-2 flex justify-center items-center"
        style={{ backgroundColor: activityType.color + "66" }}
      >
        <Image src={activityType.iconPath} alt="icon" width={35} height={35} />
      </div>
      <div>
        <h1 className="panel-title">{activityType.name}</h1>
        <h2 className="text-xl">{activityType.details}</h2>
      </div>
      <button className="btn btn-sm btn-circle  btn-secondary w-15 h-15">
        <Image src="/wrench.svg" alt="edit" width={30} height={30} />
      </button>
    </section>
  );
};

export default ActivityHeading;
