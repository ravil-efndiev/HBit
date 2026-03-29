import { routeError } from "../routeError";
import { NextResponse } from "next/server";
import http, { IncomingMessage } from "http";
import https from "https";

export const dynamic = "force-dynamic";

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const userPublicId = searchParams.get("userPublicId");

    if (!userPublicId) {
      return NextResponse.json(
        {
          error: "userPublicId search param not provided",
        },
        { status: 400 },
      );
    }

    const url = new URL(`${process.env.PUBLIC_SERVICE_URL}/social/events`);
    url.searchParams.set("userPublicId", userPublicId);

    const client = url.protocol === "https:" ? https : http;

    const stream = await new Promise<IncomingMessage>((resolve, reject) => {
      const request = client.get(
        url.toString(),
        {
          headers: {
            "x-api-key": process.env.PUBLIC_SERVICE_API_KEY || "",
            Accept: "text/event-stream",
          },
        },
        resolve,
      );
      request.on("error", reject);
    });

    const readable = new ReadableStream({
      start(controller) {
        stream.on("data", (chunk) => {
          console.log("Next.js received chunk from Nest:", chunk.toString());
          controller.enqueue(chunk);
        });
        stream.on("end", () => controller.close());
        stream.on("error", (err) => controller.error(err));
      },
      cancel() {
        stream.destroy();
      },
    });

    return new NextResponse(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (err) {
    return routeError(err);
  }
};
