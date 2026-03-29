import { ParsedNotification, PublicUser } from "@/lib/types";
import { JsonObject } from "@prisma/client/runtime/library";

interface Props {
  notification: ParsedNotification;
  onFriendRequestAccept: (
    requesterPubId: string,
    notificationId: string,
  ) => Promise<void>;
  onFriendRequestReject: (
    requesterPubId: string,
    notificationId: string,
  ) => Promise<void>;
}

const FriendRequestRecievedNotification = ({
  notification,
  onFriendRequestAccept,
  onFriendRequestReject,
}: Props) => {
  const sender = notification.payload as PublicUser;

  return (
    <>
      <p className="flex-1">
        <span className="font-bold">{sender.name}</span> (@
        {sender.username}) has sent you a friend request
      </p>
      <button
        className="btn btn-ghost btn-primary btn-circle text-lg"
        onClick={() => onFriendRequestAccept(sender.publicId, notification.id)}
      >
        ✓
      </button>
      <button
        className="btn btn-ghost btn-warning btn-circle text-lg"
        onClick={() => onFriendRequestReject(sender.publicId, notification.id)}
      >
        ✕
      </button>
    </>
  );
};

export default FriendRequestRecievedNotification;
