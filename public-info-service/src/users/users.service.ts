import { ConflictException, Injectable } from "@nestjs/common";
import { UserPostRequestBody } from "src/lib/types";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createPublicUser(body: UserPostRequestBody) {
    const { username, name, privateId } = body;
    const alreadyExists = await this.prisma.publicUser.findFirst({
      where: { OR: [{ username }, { privateId }] },
    });

    if (alreadyExists) {
      throw new ConflictException(
        "Public user identity with provided username or id already exists",
      );
    }

    const publicUser = await this.prisma.publicUser.create({
      data: { username, name, privateId },
    });

    return { publicUser };
  }

  async findUsers(usernamePart: string) {
    const found = await this.prisma.publicUser.findMany({
      where: { username: { startsWith: usernamePart } },
    });

    return { found };
  }
}
