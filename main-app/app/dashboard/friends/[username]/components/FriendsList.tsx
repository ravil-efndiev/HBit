import ProfilePicture from "@/components/ProfilePicture";
import { PublicUser } from "@/lib/types";
import { ArrowRight, Users } from "lucide-react";
import Link from "next/link";

const noFriendsFoundSecondaryTextStyle = "mt-1 max-w-sm text-sm text-(--col-text-secondary)";

interface Props {
  friends: PublicUser[];
  isOwnFriendsPage: boolean;
  user: PublicUser;
  noFriendsFoundFromServer: boolean;
}

const FriendsList = ({
  friends,
  isOwnFriendsPage,
  user,
  noFriendsFoundFromServer,
}: Props) => {
  return (
    <>
      {friends.length > 0 ? (
        <ul className="grid gap-3 sm:grid-cols-2">
          {friends.map((friend) => (
            <li key={friend.publicId}>
              <Link
                href={`/dashboard/user/${friend.username}`}
                className="group flex items-center gap-3 rounded-lg border border-gray-200 bg-(--col-background) p-3 transition hover:border-(--col-primary-main) hover:shadow-sm dark:border-gray-700"
              >
                <ProfilePicture size={48} url={friend.pfpUrl} />
                <span className="min-w-0 flex-1">
                  <strong className="block truncate font-medium text-(--col-text-primary)">
                    {friend.name}
                  </strong>
                  <span className="block truncate text-sm text-(--col-text-secondary)">
                    @{friend.username}
                  </span>
                </span>
                <ArrowRight
                  size={18}
                  className="shrink-0 text-(--col-text-secondary) transition group-hover:translate-x-0.5 group-hover:text-(--col-primary-dark)"
                  aria-hidden="true"
                />
                <span className="sr-only">View {friend.name}'s profile</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 px-6 py-12 text-center dark:border-gray-700">
          <Users
            size={30}
            className="mb-3 text-(--col-text-secondary)"
            aria-hidden="true"
          />
          <h3 className="font-medium text-(--col-text-primary)">
            {noFriendsFoundFromServer ? "No friends yet" : "No friends found"}
          </h3>
          {noFriendsFoundFromServer ? (
            <p className={noFriendsFoundSecondaryTextStyle}>
              When {isOwnFriendsPage ? "you connect" : `${user.name} connects`}{" "}
              with people, they'll appear here.
            </p>
          ) : (
            <p className={noFriendsFoundSecondaryTextStyle}>
              No friends found matching your search. Try adjusting your search criteria.
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default FriendsList;
