import { appendTimeZero, msToMinutesHours } from "@/lib/timeConverts";
import { DailyHabit } from "@prisma/client";
import Image from "next/image";
import ProgressBar from "./ProgressBar";
import EditHabit from "../EditHabit";

interface Props {
  habit: DailyHabit;
}

export const getFormattedTime = (time: number) => {
  const timeMH = msToMinutesHours(time)!;
  return {
    minutes: appendTimeZero(timeMH.minutes),
    hours: appendTimeZero(timeMH.hours),
  };
};

const DailyHabitDisplay = ({ habit }: Props) => {
  const timeGoal = getFormattedTime(habit.timeGoal);

  return (
    <div className="display">
      <Image src={habit.iconPath} alt="icon" width={50} height={50} />
      <div className="flex-2 ml-5 pr-2">
        <p className="text-lg">{habit.name}</p>
        <p className="text-(--col-text-secondary) max-w-[85%]">{habit.details}</p>
      </div>
      <ProgressBar
        habitId={habit.id}
        timeGoalMs={habit.timeGoal}
        initialTimeSpentMs={habit.timeSpent}
      />
      <div className="ml-10 text-[1rem] flex-1 font-light">
        goal:{" "}
        <span className="text-(--col-text-secondary)">
          {parseInt(timeGoal.hours) > 0 && `${timeGoal.hours}h `}
          {parseInt(timeGoal.minutes) > 0 && `${timeGoal.minutes}m`}
        </span>
      </div>
      <EditHabit type="daily" initialHabit={habit} />
    </div>
  );
};

export default DailyHabitDisplay;
