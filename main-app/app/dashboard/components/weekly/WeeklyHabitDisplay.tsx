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
    <div className="display" id={habit.id.toString()}>
      <Image src={habit.iconPath} alt="icon" width={50} height={50} />
      <div className="flex-2 ml-5 pr-2">
        <p className="text-lg">{habit.name}</p>
        <p className="text-(--col-text-secondary) max-w-3/4">{habit.details}</p>
      </div>
      <p>
        {habit.days.length}{" "}
        <span className="text-(--col-text-secondary)">times a week</span>
      </p>
      <ul className="flex flex-5 justify-around bg-sky-100 py-2 px-4 rounded-full shadow-sm ml-5">
        {formatDays(dayNames)?.map((day, index) => (
          <li
            key={index}
            className={`p-2 rounded-full min-w-15 text-center ${
              habit.days.includes(day) ? "bg-sky-200" : "bg-inherit"
            }`}
          >
            {shortDayNames[day]}
          </li>
        ))}
      </ul>
      <EditHabit type="weekly" initialHabit={habit} />
    </div>
  );
};

export default WeeklyHabitDisplay;
