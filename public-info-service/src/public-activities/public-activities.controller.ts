import { Body, Controller, Get, Param, Post, Req } from "@nestjs/common";
import { PublicActivitiesService } from "./public-activities.service";
import type { ActivityPostRequestBody } from "src/lib/types";

@Controller("public-activities")
export class PublicActivitiesController {
  constructor(
    private readonly publicActivitiesService: PublicActivitiesService,
  ) {}

  @Get()
  getAllActivities() {
    return this.publicActivitiesService.getAllActivities();
  }

  @Get(":id")
  getActivity(@Param("id") id: string) {
    return this.publicActivitiesService.getActivity(id);
  }

  @Post()
  postActivity(@Body() body: ActivityPostRequestBody) {
    return this.publicActivitiesService.postActivity(body);
  }
}
