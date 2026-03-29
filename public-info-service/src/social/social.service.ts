import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaClient } from "src/generated/prisma/client";
import { TransactionClient } from "src/generated/prisma/internal/prismaNamespace";
import { PrismaService } from "src/prisma/prisma.service";
import { RedisPubSubService } from "src/redis-pub-sub/redis-pub-sub.service";

@Injectable()
export class SocialService {
  private readonly FriendshipStatus = {
    pending: "pending",
    accepted: "accepted",
    none: "none",
  } as const;

  constructor(
    private readonly prisma: PrismaService,
    private readonly redisEventService: RedisPubSubService,
  ) {}

  async createFriendRequest(senderId: string, recieverId: string) {
    const { sender } = await this.prisma.$transaction(async (tx) => {
      const users = await this.requireUsers(tx, senderId, recieverId);
      await this.enforceNoFriendshipOrRequest(tx, senderId, recieverId);

      await tx.friendship.create({
        data: {
          userId: senderId,
          friendId: recieverId,
          status: "PENDING",
        },
      });

      return users;
    });

    this.redisEventService.emitSocialEvent({
      userId: recieverId,
      data: sender,
      type: "FRIEND_REQUEST_SENT",
    });

    return {
      message: `Sent a friend request from ${senderId} to ${recieverId}`,
    };
  }

  async acceptFriendRequest(senderId: string, recieverId: string) {
    const { reciever } = await this.prisma.$transaction(async (tx) => {
      const users = await this.requireUsers(tx, senderId, recieverId);

      await tx.friendship.update({
        where: {
          userId_friendId: { userId: senderId, friendId: recieverId },
          status: "PENDING",
        },
        data: { status: "ACCEPTED" },
      });

      return users;
    });

    this.redisEventService.emitSocialEvent({
      userId: senderId,
      data: reciever,
      type: "FRIEND_REQUEST_ACCEPTED",
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
      await this.requireUsers(tx, senderId, recieverId);

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

  async areUsersFriends(user1PublicId: string, user2PublicId: string) {
    const status = await this.checkFriendshipStatus(
      this.prisma,
      user1PublicId,
      user2PublicId,
    );
    return { areFriends: status == this.FriendshipStatus.accepted };
  }

  private async requireUsers(
    tx: TransactionClient,
    senderId: string,
    recieverId: string,
  ) {
    const sender = await tx.publicUser.findUnique({
      where: { publicId: senderId },
      omit: { privateId: true },
    });

    if (!sender) {
      throw new NotFoundException("Friend request sender not found");
    }

    const reciever = await tx.publicUser.findUnique({
      where: { publicId: recieverId },
      omit: { privateId: true },
    });

    if (!reciever) {
      throw new NotFoundException("Friend request reciever not found");
    }

    return { sender, reciever }; // return both users to use in event emmission to omit extra db calls
  }

  private async checkFriendshipStatus(
    client: PrismaClient | TransactionClient,
    user1Id: string,
    user2Id: string,
  ) {
    const existingFriendship = await client.friendship.findFirst({
      where: {
        OR: [
          { AND: [{ userId: user1Id }, { friendId: user2Id }] },
          { AND: [{ userId: user2Id }, { friendId: user1Id }] },
        ],
      },
      select: { status: true },
    });

    if (existingFriendship && existingFriendship.status === "PENDING") {
      return this.FriendshipStatus.pending;
    } else if (existingFriendship && existingFriendship.status === "ACCEPTED") {
      return this.FriendshipStatus.accepted;
    } else {
      return this.FriendshipStatus.none;
    }
  }

  private async enforceNoFriendshipOrRequest(
    tx: TransactionClient,
    senderId: string,
    recieverId: string,
  ) {
    const status = await this.checkFriendshipStatus(tx, senderId, recieverId);
    switch (status) {
      case this.FriendshipStatus.accepted:
        throw new ConflictException("Users are already friends");
      case this.FriendshipStatus.pending:
        throw new ConflictException("Friend request already sent");
    }
  }
}
