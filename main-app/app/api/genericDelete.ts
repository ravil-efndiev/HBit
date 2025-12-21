import { NextResponse } from "next/server";
import { PrismaModel } from "./prismaModel";
import { routeError } from "./routeError";
import {
  actionInternalError,
  ActionResult,
  actionSucess,
} from "@/actions/actionResult";

export const getGenericDelete =
  (prismaModel: PrismaModel) => async (req: Request) => {
    try {
      const { id } = await req.json();

      await prismaModel.delete({ where: { id } });

      return NextResponse.json(
        { message: "delete successful" },
        { status: 200 }
      );
    } catch (err) {
      return routeError(err);
    }
  };

export const getGenericDeleteAction =
  (prismaModel: PrismaModel) =>
  async (id: string | number): Promise<ActionResult> => {
    try {
      await prismaModel.delete({ where: { id } });

      return actionSucess();
    } catch (err) {
      return actionInternalError(err);
    }
  };
