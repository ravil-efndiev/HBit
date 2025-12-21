import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UserPatchRequestBody, UserPostRequestBody } from "src/lib/types";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createPublicUser(body: UserPostRequestBody) {
    const { username, name, privateId, pfpUrl } = body;
    const alreadyExists = await this.prisma.publicUser.findFirst({
      where: { OR: [{ username }, { privateId }] },
      select: { publicId: true },
    });

    if (alreadyExists) {
      throw new ConflictException(
        "Public user identity with provided username or id already exists",
      );
    }

    const publicUser = await this.prisma.publicUser.create({
      data: { username, name, privateId, pfpUrl },
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

  async findUsersByUsernamePart(usernamePart: string) {
    const found = await this.prisma.publicUser.findMany({
      where: { username: { startsWith: usernamePart } },
      omit: { privateId: true },
      take: 5,
    });

    return { found };
  }

  async getUserDataById(id: string, type: "public" | "private") {
    const publicUser = await this.prisma.publicUser.findUnique({
      where: type === "public" ? { publicId: id } : { privateId: id },
      omit: { privateId: true },
    });

    if (!publicUser) {
      throw new NotFoundException("User not found");
    }

    return { publicUser };
  }
}
