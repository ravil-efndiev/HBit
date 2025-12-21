"use client";

import { sendFriendRequest } from "@/actions/friendRequest.action";

interface Props {
  senderId: string;
  recieverId: string;
}

const SendFriendRequestButton = ({ senderId, recieverId }: Props) => {
  const handleClick = async () => {
    const res = await sendFriendRequest(senderId, recieverId);
    if (!res.ok) {
      console.error(res.error);
    }
  };

  return (
    <button className="btn btn-secondary" onClick={handleClick}>
      Add friend
    </button>
  );
};

export default SendFriendRequestButton;
