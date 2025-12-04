import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import type { UserPostRequestBody } from "src/lib/types";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createPublicUser(@Body() body: UserPostRequestBody) {
    return this.usersService.createPublicUser(body);
  }

  @Get(":usernamePart")
  findUsersByUsernamePart(@Param("usernamePart") usernamePart: string) {
    return this.usersService.findUsers(usernamePart);
  }
}
