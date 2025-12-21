import { Injectable } from "@nestjs/common";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "src/generated/prisma/client";

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaPg({ connectionString: process.env.DB_URL });
    super({
      adapter,
      log: process.env.NODE_ENV === "production" ? ["query", "error"] : [],
      omit: {
        publicUser: {
          privateId: true,
        },
        publicActivity: {
          privateId: true,
        },
      },
    });
  }
}
