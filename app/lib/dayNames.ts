export const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const shortDayNames: { [longName: string]: string } = {
  Sunday: "Sun",
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
};

export const dateToDayName = (date: Date) => {
  const day = date.getDay();
  return dayNames[day];
};

export const isDayNameToday = (dayName: string) => {
  const today = new Date();
  return today.getDay() === dayNames.indexOf(dayName);
};
