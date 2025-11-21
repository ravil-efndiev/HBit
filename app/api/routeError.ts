import { NextResponse } from "next/server";

export const routeError = (error: any) => {
  console.error(error);
  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
};
