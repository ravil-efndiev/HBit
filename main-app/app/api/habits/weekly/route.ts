import { prisma } from "@/lib/prisma";
import { HabitCrud } from "../habitsCrud";

const weeklyHabitsCrud = new HabitCrud({
  prismaModel: prisma.weeklyHabit,
  setPostData: (body) => ({
    days: body.days,
  }),
  setPatchData: (body) => ({
    days: body.days,
  }),
});

export const POST = weeklyHabitsCrud.getPost();
export const PATCH = weeklyHabitsCrud.getPatch();
export const DELETE = weeklyHabitsCrud.getDelete();
