import { ParsedNotification, PublicUser } from "@/lib/types";

interface Props {
  notification: ParsedNotification;
  onNotificationClear: (notificationId: string) => Promise<void>;
}

const FriendRequestAcceptedNotification = ({
  notification,
  onNotificationClear,
}: Props) => {
  const reciever = notification.payload as PublicUser;

  return (
    <>
      <p className="flex-1">
        <span className="font-bold">{reciever.name}</span> (@
        {reciever.username}) has accepted your friend request
      </p>
      <button
        className="btn btn-outline btn-warning btn-circle text-lg"
        onClick={() => onNotificationClear(notification.id)}
      >
        ✕
      </button>
    </>
  );
};

export default FriendRequestAcceptedNotification;
