"use client";

import { sendFriendRequest } from "@/actions/friendRequest.action";

interface Props {
  senderId: string;
  recieverId: string;
  disabled: boolean;
}

const SendFriendRequestButton = ({ senderId, recieverId, disabled }: Props) => {
  const handleClick = async () => {
    const res = await sendFriendRequest(senderId, recieverId);
    if (!res.ok) {
      console.error(res.error);
    }
  };

  return (
    <button
      className={`btn btn-secondary ${disabled ? "btn-disabled" : ""}`}
      onClick={handleClick}
      aria-disabled={disabled ? "true" : "false"}
    >
      {disabled ? "Friend" : "Add friend"}
    </button>
  );
};

export default SendFriendRequestButton;
