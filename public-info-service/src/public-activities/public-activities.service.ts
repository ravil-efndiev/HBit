import { Injectable, NotFoundException } from "@nestjs/common";
import { ActivityPostRequestBody } from "src/lib/types";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PublicActivitiesService {
  constructor(private prisma: PrismaService) {}

  async getAllActivities(userId: string) {
    const activities = await this.prisma.publicActivity.findMany({
      where: { userId },
      omit: { privateId: true },
    });
    return { activities };
  }

  async getActivity(publicId: string) {
    const activity = await this.prisma.publicActivity.findUnique({
      where: { publicId },
      omit: { privateId: true },
    });

    if (!activity) {
      throw new NotFoundException("Activity not found");
    }

    return { activity };
  }

  async createActivity(body: ActivityPostRequestBody) {
    const { userPublicId, activityTypePrivateId, ...rest } = body;

    const activity = await this.prisma.$transaction(async (tx) => {
      const userExists = await tx.publicUser.findUnique({
        where: { publicId: userPublicId },
        select: { publicId: true },
      });

      if (!userExists) {
        throw new NotFoundException("User not found");
      }

      const activity = await tx.publicActivity.create({
        data: {
          userId: userPublicId,
          privateId: activityTypePrivateId,
          ...rest,
        },
      });
      return activity;
    });
    return { activity };
  }
}
