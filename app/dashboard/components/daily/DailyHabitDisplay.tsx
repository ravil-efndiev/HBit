import { appendTimeZero, msToMinutesHours } from "@/lib/timeConverts";
import { DailyHabit } from "@prisma/client";
import Image from "next/image";
import ProgressBar from "./ProgressBar";
import EditDailyHabit from "./EditDailyHabit";

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
    <div className="flex w-[90%] py-2 px-5 bg-(--col-background) items-center mx-auto rounded-xl shadow-xs my-1">
      <Image src={habit.iconPath} alt="icon" width={50} height={50} />
      <div className="flex-2 ml-5 pr-2">
        <p className="text-lg">{habit.name}</p>
        <p className="text-(--col-text-secondary)">{habit.details}</p>
      </div>
      <ProgressBar
        habitId={habit.id}
        timeGoalMs={habit.timeGoal}
        initialTimeSpentMs={habit.timeSpent}
      />
      <div className="ml-10 text-[1rem] flex-1">
        goal:{" "}
        <span className="text-(--col-text-secondary)">
          {parseInt(timeGoal.hours) > 0 && `${timeGoal.hours}h `}
          {parseInt(timeGoal.minutes) > 0 && `${timeGoal.minutes}m`}
        </span>
      </div>
      <EditDailyHabit initialHabit={habit} onHabitEdit={() => window.location.reload()} />
    </div>
  );
};

export default DailyHabitDisplay;
