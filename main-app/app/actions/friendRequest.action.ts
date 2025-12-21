"use server";

import { publicServiceRequest, RequestError } from "@/lib/requests";
import {
  actionError,
  actionInternalError,
  ActionResult,
  actionSucess,
} from "./actionResult";

const friendRequestAction = async (
  route: string,
  senderId: string,
  recieverId: string
) => {
  try {
    const { message } = await publicServiceRequest({
      endpoint: `/social/${route}`,
      method: "POST",
      body: { senderId, recieverId },
    });

    console.log(message);
    return actionSucess();
  } catch (err) {
    const error = err as RequestError;

    if (error.status !== 500) {
      return actionError(error.error.message);
    }

    return actionInternalError(err);
  }
};

type FriendRequestAction = (
  senderId: string,
  recieverId: string
) => Promise<ActionResult>;

export const sendFriendRequest: FriendRequestAction = async (
  senderId,
  recieverId
) => friendRequestAction("friend-request", senderId, recieverId);

export const acceptFriendRequest: FriendRequestAction = async (
  senderId,
  recieverId
) => friendRequestAction("friend-accept", senderId, recieverId);

export const rejectFriendRequest: FriendRequestAction = async (
  senderId,
  recieverId
) => friendRequestAction("friend-reject", senderId, recieverId);

export const cancelFriendRequest: FriendRequestAction = async (
  senderId,
  recieverId
) => friendRequestAction("friend-cancel", senderId, recieverId);
