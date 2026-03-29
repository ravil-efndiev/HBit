import { PublicUser } from "src/generated/prisma/client";

export interface ActivityPostRequestBody {
  userPublicId: string;
  activityTypePrivateId: string;
  name: string;
  details: string;
  iconPath: string;
  color: string;
  lastEntryTime?: string;
  totalEntries: number;
  lastWeekEntries: number;
}

export interface ActivityPatchRequestBody {
  activityTypePrivateId: string;
  name?: string;
  details?: string;
  iconPath?: string;
  color?: string;
  lastEntryTime?: string;
  totalEntries?: number;
  lastWeekEntries?: number;
}

export interface UserPostRequestBody {
  privateId: string;
  username: string;
  name: string;
  pfpUrl: string | null;
}

export interface UserPatchRequestBody {
  privateId: string;
  username?: string;
  name?: string;
  pfpUrl?: string | null;
}

export interface FriendRequestBody {
  senderId: string;
  recieverId: string;
}

interface Event {
  userId: string;
  type: string;
  data: object;
}

export interface SocialEvent extends Event {
  userId: string;
  type: "FRIEND_REQUEST_SENT" | "FRIEND_REQUEST_ACCEPTED";
  data: Omit<PublicUser, "privateId">;
}
