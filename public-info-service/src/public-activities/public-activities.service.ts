import { Injectable, NotFoundException } from "@nestjs/common";
import { ActivityPostRequestBody } from "src/lib/types";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PublicActivitiesService {
  constructor(private prisma: PrismaService) {}

  async getAllActivities(userId: string) {
    const allActivities = await this.prisma.publicActivity.findMany({
      where: { userId },
    });
    const activityData = allActivities.map((activity) => {
      const { privateId, ...data } = activity;
      return data;
    });
    return { activities: activityData };
  }

  async getActivity(id: string) {
    const activity = await this.prisma.publicActivity.findUnique({
      where: { id },
    });

    if (!activity) {
      throw new NotFoundException("Activity not found");
    }

    const { privateId, ...data } = activity;
    return { activity: data };
  }

  async createActivity(body: ActivityPostRequestBody) {
    
    return {};
  }
}
