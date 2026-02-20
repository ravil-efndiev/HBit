import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { SocialService } from "./social.service";
import { type FriendRequestBody } from "src/lib/types";

@Controller("social")
export class SocialController {
  constructor(private readonly socialService: SocialService) {}

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
}
