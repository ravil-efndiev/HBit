import { appendTimeZero, msToMinutesHours } from "@/lib/timeConverts";
import Image from "next/image";
import ProgressBar from "./ProgressBar";
import EditHabit from "../EditHabit";
import { DailyHabitWithStreak } from "@/lib/types";

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
      className="display grid grid-cols-[minmax(0,1fr)_auto_auto] gap-2 min-[1200px]:flex min-[1200px]:flex-row min-[1200px]:gap-0!"
      id={habit.id.toString()}
    >
      <div className="col-span-3 row-start-1 flex w-fit max-w-full items-center justify-center gap-1 justify-self-center min-[1200px]:contents">
        <Image
          src={habit.iconPath}
          alt="icon"
          width={50}
          height={50}
          className="h-10 w-10 sm:h-12 sm:w-12 min-[1200px]:h-[50px] min-[1200px]:w-[50px]"
        />
        <div className="flex-2 ml-0 pr-2 text-center sm:ml-2 min-[1200px]:ml-5 min-[1200px]:text-left!">
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
                <p className="text-(--col-text-secondary)">{streak}</p>
              </>
            )}
          </div>
          <p className="mx-auto max-w-[85%] text-(--col-text-secondary) min-[1200px]:mx-0!">
            {habit.details}
          </p>
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
        <span className="text-(--col-text-secondary)">
          {parseInt(timeGoal.hours) > 0 && `${timeGoal.hours}h `}
          {parseInt(timeGoal.minutes) > 0 && `${timeGoal.minutes}m`}
        </span>
      </div>
      <div className="col-start-3 row-start-2 justify-self-end min-[1200px]:shrink-0">
        <EditHabit type="daily" initialHabit={habit} />
      </div>
    </div>
  );
};

export default DailyHabitDisplay;
