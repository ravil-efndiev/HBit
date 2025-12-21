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

export const POST = dailyHabitsCrud.getPost();
export const PATCH = dailyHabitsCrud.getPatch();
export const DELETE = dailyHabitsCrud.getDelete();
