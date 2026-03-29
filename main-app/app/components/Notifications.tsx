"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import useClickAwayListener from "../hooks/useClickAwayListener";
import { UserWithPublicId } from "@/lib/types";
import {
  acceptFriendRequest,
  rejectFriendRequest,
} from "@/actions/friendRequest.action";
import { eventTypes, useNotifications } from "./context/NotificationsProvider";
import FriendRequestRecievedNotification from "./FriendRequestRecievedNotification";
import { deleteNotification } from "@/actions/notification.action";
import FriendRequestAcceptedNotification from "./FriendRequestAcceptedNotification";

interface Props {
  user: UserWithPublicId;
}

const Notifications = ({ user }: Props) => {
  const [open, setOpen] = useState(false);
  const notifsRef = useRef<HTMLDivElement>(null);

  const { notificaitons, setNotifications } = useNotifications();

  useClickAwayListener(notifsRef, () => {
    setOpen(false);
  });

  const removeNotification = async (notificationId: string) => {
    const res = await deleteNotification(notificationId);
    if (!res.ok) {
      return console.error(res.error);
    }
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
  };

  const handleFriendRequestAccept = async (
    requesterPubId: string,
    notificationId: string,
  ) => {
    const res = await acceptFriendRequest(requesterPubId, user.publicId);
    if (!res.ok) {
      return console.error(res.error);
    }
    removeNotification(notificationId);
  };

  const handleFriendRequestReject = async (
    requesterPubId: string,
    notificationId: string,
  ) => {
    const res = await rejectFriendRequest(requesterPubId, user.publicId);
    if (!res.ok) {
      return console.error(res.error);
    }
    removeNotification(notificationId);
  };

  return (
    <div className="relative">
      <button
        className="btn btn-ghost"
        onClick={() => setOpen(true)}
        disabled={open}
      >
        <Image src="/bell.svg" alt="notifications" width={25} height={25} />
      </button>
      {open && (
        <div className="panel absolute w-sm h-72 right-0" ref={notifsRef}>
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-lg"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
          <p className="w-full text-center text-xl">Notifications</p>
          <ul className="my-3">
            {notificaitons.map((notificaiton, index) => (
              <li key={notificaiton.id} className="">
                <div className="flex items-center gap-3">
                  {notificaiton.type === eventTypes.friendRequestSent ? (
                    <FriendRequestRecievedNotification
                      notification={notificaiton}
                      onFriendRequestAccept={handleFriendRequestAccept}
                      onFriendRequestReject={handleFriendRequestReject}
                    />
                  ) : notificaiton.type === eventTypes.friendRequestAccepted ? (
                    <FriendRequestAcceptedNotification
                      notification={notificaiton}
                      onNotificationClear={removeNotification}
                    />
                  ) : null}
                </div>
                <p className="text-(--text-secondary) font-light text-sm">
                  {notificaiton.recievedAt.toLocaleDateString("cs-CZ")}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notifications;
