import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import type { UserPatchRequestBody, UserPostRequestBody } from "src/lib/types";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createPublicUser(@Body() body: UserPostRequestBody) {
    return this.usersService.createPublicUser(body);
  }

  @Patch()
  updatePublicUser(@Body() body: UserPatchRequestBody) {
    return this.usersService.updatePublicUser(body);
  }

  @Get()
  getUserDataByPublicId(
    @Query("publicId") publicId?: string,
    @Query("privateId") privateId?: string,
  ) {
    if ((publicId && privateId) || (!publicId && !privateId))
      throw new BadRequestException(
        "Invalid url parameters, please provide `publicId` or `privateId` param",
      );

    return publicId
      ? this.usersService.getUserDataById(publicId, "public")
      : this.usersService.getUserDataById(privateId!, "private");
  }

  @Get("/search/:usernamePart")
  findUserIdsByUsernamePart(@Param("usernamePart") usernamePart: string) {
    return this.usersService.findUserIds(usernamePart);
  }
}
