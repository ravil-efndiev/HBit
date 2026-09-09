import { WeeklyHabit } from "@prisma/client";
import Image from "next/image";
import EditHabit from "../EditHabit";
import { formatDays } from "@/lib/misc";
import { dayNames, shortDayNames } from "@/lib/dayNames";
import { habitDisplayStyles } from "@/dashboard/habitDisplayStyles";

interface Props {
  habit: WeeklyHabit;
}

const WeeklyHabitDisplay = ({ habit }: Props) => {
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
          <p className="text-lg">{habit.name}</p>
          <p className={habitDisplayStyles.detailsText}>{habit.details}</p>
        </div>
      </div>
      <p className="col-start-1 row-start-3 col-span-2 ml-0 self-start text-left min-[1200px]:order-1 min-[1200px]:self-center min-[1200px]:ml-0">
        {habit.days.length}{" "}
        <span className={habitDisplayStyles.mutedText}>times a week</span>
      </p>
      <ul className="col-start-1 row-start-2 col-span-2 flex justify-around w-full gap-1 overflow-hidden rounded-full bg-sky-100 py-2 shadow-sm sm:gap-2 sm:px-4 min-[1200px]:order-2 min-[1200px]:w-auto min-[1200px]:flex-5 min-[1200px]:ml-5 px-2">
        {formatDays(dayNames)?.map((day, index) => (
          <li
            key={index}
            className={`min-w-0 flex-1 rounded-full px-1 py-2 text-center text-xs sm:min-w-15 sm:flex-none sm:p-2 sm:text-base ${
              habit.days.includes(day) ? "bg-sky-200" : "bg-inherit"
            }`}
          >
            {shortDayNames[day]}
          </li>
        ))}
      </ul>
      <div className={habitDisplayStyles.actionCell}>
        <EditHabit type="weekly" initialHabit={habit} />
      </div>
    </div>
  );
};

export default WeeklyHabitDisplay;
