class HabitCreateRequestBody {
  name: string;
  details: string;
  iconPath: string;

  constructor(name: string, details: string, iconPath: string) {
    this.name = name;
    this.details = details;
    this.iconPath = iconPath;
  }
}

class HabitUpdateRequestBody {
  name?: string;
  details?: string;
  iconPath?: string;
  habitId?: number;

  constructor(args: {
    habitId?: number;
    name?: string;
    details?: string;
    iconPath?: string;
  }) {
    this.habitId = args.habitId;
    this.name = args.name;
    this.details = args.details;
    this.iconPath = args.iconPath;
  }
}

export class DailyHabitCreateRequestBody extends HabitCreateRequestBody {
  timeGoal: number;

  constructor(
    name: string,
    details: string,
    iconPath: string,
    timeGoal: number
  ) {
    super(name, details, iconPath);
    this.timeGoal = timeGoal;
  }
}

export class DailyHabitUpdateRequestBody extends HabitUpdateRequestBody {
  timeGoal?: number;
  timeSpent?: number;

  constructor(args: {
    habitId?: number;
    name?: string;
    details?: string;
    iconPath?: string;
    timeGoal?: number;
    timeSpent?: number;
  }) {
    super({ ...args });
    this.timeGoal = args.timeGoal;
    this.timeSpent = args.timeSpent;
  }
}

export class WeeklyHabitCreateRequestBody extends HabitCreateRequestBody {
  days: string[];

  constructor(name: string, details: string, iconPath: string, days: string[]) {
    super(name, details, iconPath);
    this.days = days;
  }
}

export class WeeklyHabitUpdateRequestBody extends HabitUpdateRequestBody {
  days?: string[];

  constructor(args: {
    habitId?: number;
    name?: string;
    details?: string;
    iconPath?: string;
    days?: string[];
  }) {
    super({ ...args });
    this.days = args.days;
  }
}

export const chooseHabitEndpoint = (
  body:
    | DailyHabitCreateRequestBody
    | DailyHabitUpdateRequestBody
    | WeeklyHabitCreateRequestBody
    | WeeklyHabitUpdateRequestBody
) =>
  body instanceof DailyHabitCreateRequestBody ||
  body instanceof DailyHabitUpdateRequestBody
    ? "/api/habits/daily"
    : "/api/habits/weekly";
