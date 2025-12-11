import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UserPatchRequestBody, UserPostRequestBody } from "src/lib/types";
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

  async updatePublicUser(body: UserPatchRequestBody) {
    const { privateId, username, name, pfpUrl } = body;

    const updateData = Object.fromEntries(
      Object.entries({
        username,
        name,
        pfpUrl,
      }).filter(([_, v]) => v !== undefined),
    );

    const publicUser = await this.prisma.publicUser.update({
      where: { privateId },
      data: updateData,
    });

    return { publicUser };
  }

  async findUserIds(usernamePart: string) {
    const found = await this.prisma.publicUser.findMany({
      where: { username: { startsWith: usernamePart } },
    });

    return { foundIds: found.map((user) => user.id) };
  }

  async getUserDataById(id: string, type: "public" | "private") {
    const user = await this.prisma.publicUser.findUnique({
      where: type === "public" ? { id } : { privateId: id },
    });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    const { privateId, ...publicUser } = user;
    return { publicUser };
  }
}
