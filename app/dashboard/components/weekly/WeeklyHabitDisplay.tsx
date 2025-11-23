import { WeeklyHabit } from "@prisma/client";
import Image from "next/image";
import EditHabit from "../EditHabit";

interface Props {
  habit: WeeklyHabit;
}

const WeeklyHabitDisplay = ({ habit }: Props) => {
  return (
    <div className="habit-display" id={habit.id.toString()}>
      <Image src={habit.iconPath} alt="icon" width={50} height={50} />
      <div className="flex-2 ml-5 pr-2">
        <p className="text-lg">{habit.name}</p>
        <p className="text-(--col-text-secondary)">{habit.details}</p>
      </div>
      <EditHabit type="weekly" initialHabit={habit} />
    </div>
  );
};

export default WeeklyHabitDisplay;
