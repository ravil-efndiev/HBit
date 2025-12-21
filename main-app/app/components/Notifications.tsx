"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import useClickAwayListener from "../hooks/useClickAwayListener";
import { UserWithPublicId } from "@/lib/types";
import {
  acceptFriendRequest,
  rejectFriendRequest,
} from "@/actions/friendRequest.action";

interface Props {
  user: UserWithPublicId;
  friendRequests: UserWithPublicId[];
}

const Notifications = ({ user, friendRequests }: Props) => {
  const [open, setOpen] = useState(false);
  const notifsRef = useRef<HTMLDivElement>(null);

  const [dispFriendRequests, setDispFriendRequests] = useState(friendRequests);

  useClickAwayListener(notifsRef, () => {
    setOpen(false);
  });

  const removeDispRequest = (index: number) =>
    setDispFriendRequests((prev) => {
      const newArr = [...prev];
      newArr.splice(index, 1);
      return newArr;
    });

  const handleFriendRequestAccept = async (
    requesterPubId: string,
    dispIndex: number
  ) => {
    const res = await acceptFriendRequest(requesterPubId, user.publicId);
    if (!res.ok) {
      return console.error(res.error);
    }
    removeDispRequest(dispIndex);
  };

  const handleFriendRequestReject = async (
    requesterPubId: string,
    dispIndex: number
  ) => {
    const res = await rejectFriendRequest(requesterPubId, user.publicId);
    if (!res.ok) {
      return console.error(res.error);
    }
    removeDispRequest(dispIndex);
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
            {dispFriendRequests.map((requester, index) => (
              <li key={requester.publicId} className="flex items-center gap-3">
                <p className="flex-1">
                  <span className="font-bold">{requester.name}</span> (@
                  {requester.username}) has sent you a friend request
                </p>
                <button
                  className="btn btn-ghost btn-primary btn-circle text-lg"
                  onClick={() =>
                    handleFriendRequestAccept(requester.publicId, index)
                  }
                >
                  ✓
                </button>
                <button
                  className="btn btn-ghost btn-warning btn-circle text-lg"
                  onClick={() =>
                    handleFriendRequestReject(requester.publicId, index)
                  }
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notifications;
