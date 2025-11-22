import { prisma } from "@/lib/prisma";
import { HabitCrud } from "../habitsCrud";

const DailyHabitsCrud = new HabitCrud({
  prismaModel: prisma.weeklyHabit,
  setPostData: (body) => ({
    days: body.days,
  }),
  setPatchData: (body) => ({
    days: body.days,
  }),
});

export const POST = DailyHabitsCrud.POST;
export const PATCH = DailyHabitsCrud.PATCH;
export const DELETE = DailyHabitsCrud.DELETE;
