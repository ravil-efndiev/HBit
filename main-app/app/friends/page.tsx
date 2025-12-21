import { publicServiceRequest } from "@/lib/requests";
import { requireSessionUser } from "@/lib/session";
import { PublicUser } from "@/lib/types";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Friends - Habit tracker",
};

const FriendsPage = async () => {
  const user = await requireSessionUser();
  const { friends } = (await publicServiceRequest({
    endpoint: `/social/friends/${user.publicId}`,
    method: "GET",
  })) as { friends: PublicUser[] };

  return (
    <>
      <div className="flex w-full overflow-hidden">{friends.map(friend => <p key={friend.publicId}>{friend.name}</p>)}</div>
    </>
  );
};

export default FriendsPage;
