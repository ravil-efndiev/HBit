export interface HabitPreset {
  name: string;
  detials: string;
  iconPath: string;
}

export const dailyHabitPresets: HabitPreset[] = [
  {
    name: "Study",
    detials: "train your mind and get more knowledge",
    iconPath: "/habitIcons/study-university-svgrepo-com.svg",
  },
  {
    name: "Daily workout",
    detials: "do some light training every day to stay in shape",
    iconPath: "/habitIcons/dumbbell-gym-svgrepo-com.svg",
  },
  {
    name: "Read a book",
    detials: "learn something and improve your free-time quality",
    iconPath: "/habitIcons/book-svgrepo-com.svg",
  },
  {
    name: "Play an instrument",
    detials: "learn or improve at a musical instrument",
    iconPath: "/habitIcons/guitar-solid-svgrepo-com.svg",
  },
  {
    name: "Sleep",
    detials: "set your nightly sleep goal and get quality rest",
    iconPath: "/habitIcons/sleep-svgrepo-com.svg",
  },
];
