import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import type { UserPatchRequestBody, UserPostRequestBody } from "src/lib/types";
import { CacheInterceptor, CacheTTL } from "@nestjs/cache-manager";

@Controller("users")
@UseInterceptors(CacheInterceptor)
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
  @CacheTTL(60 * 1000)
  getUserData(
    @Query("username") username?: string,
    @Query("privateId") privateId?: string,
  ) {
    if ((username && privateId) || (!username && !privateId))
      throw new BadRequestException(
        "Invalid url parameters, please provide `username` or `privateId` param exclusivly",
      );

    return username
      ? this.usersService.getUserData({ username })
      : this.usersService.getUserData({ privateId: privateId! });
  }

  @Get("/search/:usernamePart")
  @CacheTTL(20 * 1000)
  findUserIdsByUsernamePart(@Param("usernamePart") usernamePart: string) {
    return this.usersService.findUsersByUsernamePart(usernamePart);
  }
}
