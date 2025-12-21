import { requireSessionUser } from "@/lib/session";
import { NextResponse } from "next/server";
import { routeError } from "@/api/routeError";
import { PrismaModel } from "../prismaModel";
import { getGenericDelete } from "../genericDelete";

type DataSetter = (body: { [key: string]: any }) => Object;

interface ConstructorArgs {
  prismaModel: PrismaModel;
  setPostData: DataSetter;
  setPatchData: DataSetter;
}

export class HabitCrud {
  prismaModel: PrismaModel;
  setPostData: DataSetter;
  setPatchData: DataSetter;

  constructor({ prismaModel, setPostData, setPatchData }: ConstructorArgs) {
    this.prismaModel = prismaModel;
    this.setPostData = setPostData;
    this.setPatchData = setPatchData;
  }

  getPost() {
    return async (req: Request) => {
      try {
        const user = await requireSessionUser();
        const body = await req.json();
        const { name, details, iconPath } = body;

        const data = {
          name,
          details,
          iconPath,
          userId: user.id,
          ...this.setPostData(body),
        };

        const newHabit = await this.prismaModel.create({ data });

        return NextResponse.json({ newHabit }, { status: 201 });
      } catch (err) {
        return routeError(err);
      }
    };
  }

  getPatch() {
    return async (req: Request) => {
      try {
        const user = await requireSessionUser();
        const body = await req.json();
        const { habitId, name, details, iconPath } = body;

        const updateData = Object.fromEntries(
          Object.entries({
            name,
            details,
            iconPath,
            ...this.setPatchData(body),
          }).filter(([_, v]) => v !== undefined)
        );

        const patchedHabit = await this.prismaModel.update({
          where: { userId: user.id, id: habitId },
          data: updateData,
        });

        return NextResponse.json({ patchedHabit }, { status: 200 });
      } catch (err) {
        return routeError(err);
      }
    };
  }

  getDelete() {
    return getGenericDelete(this.prismaModel);
  }
}
