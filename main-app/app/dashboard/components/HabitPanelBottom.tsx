import Link from "next/dist/client/link";
import Image from "next/image";
import AddHabit from "./AddHabit";

interface Props {
  type: "daily" | "weekly";
}

const HabitPanelBottom = ({ type }: Props) => {
  return (
    <div className="flex justify-between items-center mt-3">
      <Link
        className="btn btn-neutral bg-gray-700 flex text-lg"
        href="/dashboard/habitStats"
      >
        <Image src="/stats.svg" alt="statistics" width={30} height={30} />

        <p className="text-(--col-background)">Stats</p>
      </Link>
      <AddHabit type={type} />
    </div>
  );
};

export default HabitPanelBottom;
