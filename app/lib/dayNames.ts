export const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const dateToDayName = (date: Date) => {
  const day = date.getDay();
  return dayNames[day];
};

export const isDayNameToday = (dayName: string) => {
  const today = new Date();
  return today.getDay() === dayNames.indexOf(dayName);
};
