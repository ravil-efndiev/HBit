import { prisma } from "@/lib/prisma";
import { HabitCrud } from "../habitsCrud";

const DailyHabitsCrud = new HabitCrud({
  prismaModel: prisma.dailyHabit,
  setPostData: (body) => ({
    timeGoal: body.timeGoal,
  }),
  setPatchData: (body) => ({
    timeGoal: body.timeGoal,
    timeSpent: body.timeSpent,
  }),
});

export const POST = DailyHabitsCrud.POST;
export const PATCH = DailyHabitsCrud.PATCH;
export const DELETE = DailyHabitsCrud.DELETE;
