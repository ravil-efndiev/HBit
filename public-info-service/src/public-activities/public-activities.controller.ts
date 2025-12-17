import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import { PublicActivitiesService } from "./public-activities.service";
import { type ActivityPostRequestBody } from "src/lib/types";
import { CacheInterceptor } from "@nestjs/cache-manager";
import { CacheTTL } from "@nestjs/cache-manager";

@Controller("public-activities")
@UseInterceptors(CacheInterceptor)
export class PublicActivitiesController {
  constructor(
    private readonly publicActivitiesService: PublicActivitiesService,
  ) {}

  @Get("/user")
  @CacheTTL(50 * 1000)
  getAllUsersActivities(@Query("publicId") userId: string) {
    return this.publicActivitiesService.getAllActivities(userId);
  }

  @Get(":id")
  @CacheTTL(50 * 1000)
  getActivity(@Param("id") id: string) {
    return this.publicActivitiesService.getActivity(id);
  }

  @Post()
  postActivity(@Body() body: ActivityPostRequestBody) {
    return this.publicActivitiesService.createActivity(body);
  }
}
