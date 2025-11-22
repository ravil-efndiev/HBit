import { requireSessionUser } from "@/lib/session";
import { NextResponse } from "next/server";
import { routeError } from "@/api/routeError";

interface PrismaModel {
  create: (args: any) => Promise<any>;
  findMany: (args: any) => Promise<any[]>;
  findUnique: (args: any) => Promise<any>;
  update: (args: any) => Promise<any>;
  delete: (args: any) => Promise<any>;
}

type DataSetter = (body: { [key: string]: any }) => Object;

interface ConstructorArgs {
  prismaModel: PrismaModel;
  setPostData: DataSetter;
  setPatchData: DataSetter;
}

export class HabitCrud {
  prismaModel: PrismaModel;
  setPostData: DataSetter = () => ({});
  setPatchData: DataSetter = () => ({});

  constructor({ prismaModel, setPostData, setPatchData }: ConstructorArgs) {
    this.prismaModel = prismaModel;
    this.setPostData = setPostData;
    this.setPatchData = setPatchData;
  }

  POST = async (req: Request) => {
    try {
      const user = await requireSessionUser();
      const body = await req.json();
      const { name, desc, iconPath } = body;

      const data = {
        name,
        details: desc,
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

  PATCH = async (req: Request) => {
    try {
      const user = await requireSessionUser();
      const body = await req.json();
      const { habitId, name, desc, iconPath } = body;

      const editFields = Object.fromEntries(
        Object.entries({
          name,
          details: desc,
          iconPath,
          ...this.setPatchData(body),
        }).filter(([_, v]) => v !== undefined)
      );

      const patchedHabit = await this.prismaModel.update({
        where: { userId: user.id, id: habitId },
        data: editFields,
      });

      return NextResponse.json({ patchedHabit }, { status: 200 });
    } catch (err) {
      return routeError(err);
    }
  };

  DELETE = async (req: Request) => {
    try {
      const user = await requireSessionUser();
      const { habitId } = await req.json();

      await this.prismaModel.delete({
        where: { userId: user.id, id: habitId },
      });

      return NextResponse.json(
        { message: "delete successful" },
        { status: 200 }
      );
    } catch (err) {
      return routeError(err);
    }
  };
}
