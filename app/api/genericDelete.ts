import { NextResponse } from "next/server";
import { PrismaModel } from "./prismaModel";
import { routeError } from "./routeError";

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
