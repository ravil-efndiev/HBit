import { appendTimeZero, msToMinutesHours } from "@/lib/timeConverts";
import Image from "next/image";
import ProgressBar from "./ProgressBar";
import EditHabit from "../EditHabit";
import { DailyHabitWithStreak } from "@/lib/types";
import { habitDisplayStyles } from "@/dashboard/habitDisplayStyles";

interface Props {
  habit: DailyHabitWithStreak;
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
  const streak = habit.stats[0].streakC;

  return (
    <div
      className={`${habitDisplayStyles.wrapper} gap-2`}
      id={habit.id.toString()}
    >
      <div className={habitDisplayStyles.iconTitleBlock}>
        <Image
          src={habit.iconPath}
          alt="icon"
          width={50}
          height={50}
          className={habitDisplayStyles.icon}
        />
        <div className={habitDisplayStyles.textBlock}>
          <div className="flex justify-center text-lg min-[1200px]:justify-start!">
            {habit.name}{" "}
            {streak > 0 && (
              <>
                <Image
                  src="/fire.svg"
                  width={25}
                  height={25}
                  alt="fire"
                  className="ml-2"
                />
                <p className={habitDisplayStyles.mutedText}>{streak}</p>
              </>
            )}
          </div>
          <p className={habitDisplayStyles.detailsText}>{habit.details}</p>
        </div>
      </div>
      <div className="col-start-1 row-start-2 w-full max-[999px]:col-span-2 min-[1200px]:w-auto min-[1200px]:min-w-0 min-[1200px]:flex-5">
        <ProgressBar
          habitId={habit.id}
          timeGoalMs={habit.timeGoal}
          initialTimeSpentMs={habit.timeSpent}
          goal={`${parseInt(timeGoal.hours) > 0 ? `${timeGoal.hours}h ` : ""}${parseInt(timeGoal.minutes) > 0 ? `${timeGoal.minutes}m` : ""}`}
        />
      </div>
      <div className="col-start-2 row-start-2 ml-0 flex-1 text-[1rem] font-light max-[999px]:hidden min-[1200px]:ml-4">
        goal:{" "}
        <span className={habitDisplayStyles.mutedText}>
          {parseInt(timeGoal.hours) > 0 && `${timeGoal.hours}h `}
          {parseInt(timeGoal.minutes) > 0 && `${timeGoal.minutes}m`}
        </span>
      </div>
      <div className={habitDisplayStyles.actionCell}>
        <EditHabit type="daily" initialHabit={habit} />
      </div>
    </div>
  );
};

export default DailyHabitDisplay;
