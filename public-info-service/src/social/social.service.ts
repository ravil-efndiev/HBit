import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { sql, TransactionClient } from "src/generated/prisma/internal/prismaNamespace";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SocialService {
  constructor(private prisma: PrismaService) {}

  async createFriendRequest(senderId: string, recieverId: string) {
    await this.prisma.$transaction(async (tx) => {
      await this.checkIfUsersExist(tx, senderId, recieverId);
      await this.checkFriendshipStatus(tx, senderId, recieverId);

      await tx.friendship.create({
        data: {
          userId: senderId,
          friendId: recieverId,
          status: "PENDING",
        },
      });
    });

    return {
      message: `Sent a friend request from ${senderId} to ${recieverId}`,
    };
  }

  async acceptFriendRequest(senderId: string, recieverId: string) {
    await this.prisma.$transaction(async (tx) => {
      await this.checkIfUsersExist(tx, senderId, recieverId);

      await tx.friendship.update({
        where: {
          userId_friendId: { userId: senderId, friendId: recieverId },
          status: "PENDING",
        },
        data: { status: "ACCEPTED" },
      });
    });

    return {
      message: `Friend request from ${senderId} accepted by ${recieverId}`,
    };
  }

  async deleteFriendRequest(
    senderId: string,
    recieverId: string,
    message: string,
  ) {
    await this.prisma.$transaction(async (tx) => {
      await this.checkIfUsersExist(tx, senderId, recieverId);

      await tx.friendship.delete({
        where: { userId_friendId: { userId: senderId, friendId: recieverId } },
      });
    });

    return { message };
  }

  async getUserFriends(userId: string) {
    const frinedships = await this.prisma.friendship.findMany({
      where: { OR: [{ userId }, { friendId: userId }], status: "ACCEPTED" },
      include: {
        friend: {
          omit: { privateId: true },
        },
        user: {
          omit: { privateId: true },
        },
      },
    });

    const friends = frinedships.map((entry) =>
      entry.friendId === userId ? entry.user : entry.friend,
    );

    return { friends };
  }

  async getUserFriendRequests(userId: string, includeRequesterData?: boolean) {
    const requests = await this.prisma.friendship.findMany({
      where: { friendId: userId, status: "PENDING" },
      include: includeRequesterData ? { user: true } : {},
    });

    return { requests };
  }

  private async checkIfUsersExist(
    tx: TransactionClient,
    senderId: string,
    recieverId: string,
  ) {
    const senderExists = await tx.publicUser.findUnique({
      where: { publicId: senderId },
      select: { publicId: true },
    });

    if (!senderExists) {
      throw new NotFoundException("Friend request sender not found");
    }

    const recieverExists = await tx.publicUser.findUnique({
      where: { publicId: recieverId },
      select: { publicId: true },
    });

    if (!recieverExists) {
      throw new NotFoundException("Friend request reciever not found");
    }
  }

  private async checkFriendshipStatus(
    tx: TransactionClient,
    senderId: string,
    recieverId: string,
  ) {
    const existingFriendship = await tx.friendship.findFirst({
      where: {
        OR: [
          { AND: [{ userId: senderId }, { friendId: recieverId }] },
          { AND: [{ userId: recieverId }, { friendId: senderId }] },
        ],
      },
      select: { status: true },
    });

    if (existingFriendship && existingFriendship.status === "PENDING") {
      throw new ConflictException("Friend request already sent");
    } else if (existingFriendship && existingFriendship.status === "ACCEPTED") {
      throw new ConflictException("Users are already friends");
    }
  }
}
