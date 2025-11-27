import { prisma } from "@/lib/prisma";
import { HabitCrud } from "../habitsCrud";

const dailyHabitsCrud = new HabitCrud({
  prismaModel: prisma.dailyHabit,
  setPostData: (body) => ({
    timeGoal: body.timeGoal,
  }),
  setPatchData: (body) => ({
    timeGoal: body.timeGoal,
    timeSpent: body.timeSpent,
  }),
});

export const POST = dailyHabitsCrud.POST;
export const PATCH = dailyHabitsCrud.PATCH;
export const DELETE = dailyHabitsCrud.DELETE;
