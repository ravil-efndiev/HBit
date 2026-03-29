import { Body, Controller, Get, Param, Post, Query, Sse } from "@nestjs/common";
import { SocialService } from "./social.service";
import type { SocialEvent, FriendRequestBody } from "src/lib/types";
import { map, Observable } from "rxjs";
import { RedisPubSubService } from "src/redis-pub-sub/redis-pub-sub.service";

@Controller("social")
export class SocialController {
  constructor(
    private readonly socialService: SocialService,
    private readonly eventService: RedisPubSubService,
  ) {}

  @Post("friend-request")
  friendRequest(@Body() { senderId, recieverId }: FriendRequestBody) {
    return this.socialService.createFriendRequest(senderId, recieverId);
  }

  @Post("friend-accept")
  friendRequestAccept(@Body() { senderId, recieverId }: FriendRequestBody) {
    return this.socialService.acceptFriendRequest(senderId, recieverId);
  }

  @Post("friend-reject")
  friendRequestReject(@Body() { senderId, recieverId }: FriendRequestBody) {
    return this.socialService.deleteFriendRequest(
      senderId,
      recieverId,
      `Friend request from ${senderId} rejected by ${recieverId}`,
    );
  }

  @Post("friend-cancel")
  friendRequestCancel(@Body() { senderId, recieverId }: FriendRequestBody) {
    return this.socialService.deleteFriendRequest(
      senderId,
      recieverId,
      `Friend request to ${recieverId} cancelled by ${senderId}`,
    );
  }

  @Get("friends/:publicId")
  getFriends(@Param("publicId") publicId: string) {
    return this.socialService.getUserFriends(publicId);
  }

  @Get("friend-requests/:publicId")
  getFriendRequests(
    @Param("publicId") publicId: string,
    @Query("includeRequesterData") includeData?: boolean,
  ) {
    return this.socialService.getUserFriendRequests(publicId, includeData);
  }

  @Get("are-friends")
  checkIfAreFriends(
    @Query("user1PublicId") user1PublicId: string,
    @Query("user2PublicId") user2PublicId: string,
  ) {
    return this.socialService.areUsersFriends(user1PublicId, user2PublicId);
  }

  @Sse("events")
  sse(@Query("userPublicId") userId: string): Observable<MessageEvent> {
    return this.eventService.listen(userId);
  }
}
