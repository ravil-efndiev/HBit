import { WeeklyHabit } from "@prisma/client";
import Image from "next/image";
import EditHabit from "../EditHabit";
import { formatDays } from "@/lib/misc";
import { dayNames, shortDayNames } from "@/lib/dayNames";

interface Props {
  habit: WeeklyHabit;
}

const WeeklyHabitDisplay = ({ habit }: Props) => {
  return (
    <div
      className="display grid grid-cols-[minmax(0,1fr)_auto_auto] gap-1 min-[1200px]:flex min-[1200px]:flex-row min-[1200px]:gap-0!"
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
          <p className="text-lg">{habit.name}</p>
          <p className="mx-auto max-w-[85%] text-(--col-text-secondary) min-[1200px]:mx-0!">
            {habit.details}
          </p>
        </div>
      </div>
      <p className="col-start-1 row-start-3 col-span-2 ml-0 self-start text-left min-[1200px]:order-1 min-[1200px]:self-center min-[1200px]:ml-0">
        {habit.days.length}{" "}
        <span className="text-(--col-text-secondary)">times a week</span>
      </p>
      <ul className="col-start-1 row-start-2 col-span-2 flex w-full gap-1 overflow-hidden rounded-full bg-sky-100 py-2 shadow-sm sm:gap-2 sm:px-4 min-[1200px]:order-2 min-[1200px]:w-auto min-[1200px]:flex-5 min-[1200px]:ml-5 px-2">
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
      <div className="col-start-3 row-start-2 justify-self-end min-[1200px]:order-3 min-[1200px]:shrink-0">
        <EditHabit type="weekly" initialHabit={habit} />
      </div>
    </div>
  );
};

export default WeeklyHabitDisplay;
