import { prisma } from "@/lib/prisma";
import { requireSessionUser } from "@/lib/session";
import {
  fillAllDates,
  getMinMaxDateFromEntries,
} from "../activities/math/frequencyData";
import CalendarDisplay from "./CalendarDisplay";
import Link from "next/link";
import ArrowIcon from "./ArrowIcon";

const ActivityCalendar = async () => {
  const user = await requireSessionUser();
  const entries = await prisma.activityEntry.findMany({
    where: { type: { userId: user.id } },
  });

  const { minDate, maxDate } = getMinMaxDateFromEntries(entries);
  maxDate.setDate(
    new Date(maxDate.getFullYear(), maxDate.getMonth() + 1, 0).getDate()
  );

  const allDates = fillAllDates(minDate, maxDate, "month");

  const datesByMonth = Array.from(
    new Map(
      allDates.map((date) => [
        date.getMonth(),
        {
          month: date.getMonth(),
          year: date.getFullYear(),
        },
      ])
    ).values()
  ).map(({ month, year }) => ({
    month,
    year,
    dates: allDates.filter(
      (date) => date.getMonth() === month && date.getFullYear() === year
    ),
  }));

  return (
    <section className="panel">
      <h1 className="panel-title">Activity calendar</h1>
      <div className="display w-fit mx-auto px-12 flex-col my-5">
        <CalendarDisplay datesByMonth={datesByMonth} entries={entries} />
      </div>
      <Link href="/dashboard/activities">
        <div className="flex text-lg items-center gap-1 justify-center w-full">
          <p>Go to activities</p> <ArrowIcon size={16} direction="right" color="#388e3c" />
        </div>
      </Link>
    </section>
  );
};

export default ActivityCalendar;
