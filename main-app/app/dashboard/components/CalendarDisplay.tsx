"use client";

import { compareDates } from "@/lib/misc";
import { splitDate } from "../activities/math/frequencyData";
import { useState } from "react";
import { ActivityEntry } from "@prisma/client";
import Image from "next/image";
import ArrowIcon from "./ArrowIcon";

interface Props {
  datesByMonth: { month: number; year: number; dates: Date[] }[];
  entries: ActivityEntry[];
}

const formatOpacity = (hex: string) =>
  parseInt(hex, 16) > 0 ? (hex.length === 1 ? `0${hex}` : hex) : "0d";

const CalendarDisplay = ({ datesByMonth, entries }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(datesByMonth.length - 1);
  const { month, year, dates } = datesByMonth[currentIndex];

  const emptySpaces = new Array(dates[0].getDay() - 1).fill(0);
  const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const handleMonthInc = () => {
    setCurrentIndex((prev) =>
      prev < datesByMonth.length - 1 ? prev + 1 : prev
    );
  };

  const handleMonthDec = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const getMonthName = (monthNumber: number) => {
    return new Intl.DateTimeFormat("en", { month: "long" }).format(
      new Date(1, monthNumber, 1)
    );
  };

  return (
    <>
      <div className="min-h-80 mt-3">
        <div className="grid grid-cols-7 gap-3">
          {dayLabels.map((label) => (
            <p key={label} className="text-center text-sm">
              {label}
            </p>
          ))}
          {emptySpaces.map((_, index) => (
            <div key={index}></div>
          ))}
          {datesByMonth
            .filter((monthDates) => monthDates.month === month)
            .map((monthDates) =>
              monthDates.dates.map((date) => {
                const thisDayEntries = entries.filter((entry) =>
                  compareDates(entry.date, date, true)
                );

                return (
                  <div key={date.getTime()} className="relative">
                    <div
                      className="rounded-lg w-14 h-12 flex justify-center items-center hover-master"
                      style={{
                        backgroundColor:
                          thisDayEntries.length > 0
                            ? `#f05c2f${formatOpacity(
                                thisDayEntries.length * 20 < 255
                                  ? (thisDayEntries.length * 20).toString(16)
                                  : "ff"
                              )}`
                            : "#f5f0f0",
                      }}
                    >
                      {splitDate(date)[1]}
                    </div>
                    <p className="appear-on-hover calendar-hover">
                      Activities done: {thisDayEntries.length}
                    </p>
                  </div>
                );
              })
            )}
        </div>
      </div>
      <div className="flex items-center my-3 gap-3">
        <button className="btn btn-ghost" onClick={handleMonthDec}>
          <ArrowIcon size={20} direction="left" />
        </button>
        <h2 className="text-xl">
          {getMonthName(month)} {year}
        </h2>
        <button className="btn btn-ghost" onClick={handleMonthInc}>
          <ArrowIcon size={20} direction="right" />
        </button>
      </div>
    </>
  );
};

export default CalendarDisplay;
