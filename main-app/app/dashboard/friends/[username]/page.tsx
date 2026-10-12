import ProfilePicture from "@/components/ProfilePicture";
import { requestErrorWrapper } from "@/lib/misc";
import { publicServiceRequest } from "@/lib/requests";
import { getSessionUser } from "@/lib/session";
import { PublicUser } from "@/lib/types";
import { ArrowRight, Search, Users } from "lucide-react";
import { type Metadata } from "next";
import Link from "next/link";
import FriendsList from "./components/FriendsList";
import FriendsSearch from "./components/FriendsSearch";

interface Props {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ q?: string }>;
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { username } = await params;
  return {
    title: `@${username} friend list - HBit`,
  };
};

const FriendsPage = async ({ params, searchParams }: Props) => {
  const { username } = await params;
  const { q } = await searchParams;
  const sessionUser = await getSessionUser();
  const isOwnFriendsPage = sessionUser?.username === username;

  return requestErrorWrapper(
    [404],
    async () => {
      const { publicUser: user } = (await publicServiceRequest({
        endpoint: "/users",
        method: "GET",
        params: { username },
      })) as { publicUser: PublicUser };

      const { friends } = (await publicServiceRequest({
        endpoint: `/social/friends/${user.publicId}`,
        method: "GET",
      })) as { friends: PublicUser[] };

      const friendsFiltered = friends.filter((friend) =>
        friend.name.toLowerCase().includes(q?.toLowerCase() || "") ||
        friend.username.toLowerCase().includes(q?.toLowerCase() || ""),
      );

      return (
        <main className="content bg-gray-100 h-full">
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-5 p-4 sm:p-6 lg:p-8">
            <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-1 text-sm font-medium uppercase tracking-wider text-(--col-primary-dark)">
                  Community
                </p>
                <h1 className="text-3xl font-semibold text-(--col-text-primary)">
                  {isOwnFriendsPage ? "Your friends" : `${user.name}'s friends`}
                </h1>
                <p className="mt-1 text-(--col-text-secondary)">
                  {friends.length} {friends.length === 1 ? "friend" : "friends"}{" "}
                  in {isOwnFriendsPage ? "your" : "this"} network
                </p>
              </div>
              <FriendsSearch />
            </header>

            <section
              className="panel my-0! p-4 sm:p-6"
              aria-labelledby="friends-heading"
            >
              <div className="mb-4 flex items-center gap-3 border-b border-gray-200 pb-4 dark:border-gray-700">
                <div className="flex size-10 items-center justify-center rounded-full bg-(--col-primary-muted) text-(--col-primary-dark)">
                  <Users size={20} aria-hidden="true" />
                </div>
                <div>
                  <h2
                    id="friends-heading"
                    className="text-xl font-medium text-(--col-text-primary)"
                  >
                    Friends
                  </h2>
                  <p className="text-sm text-(--col-text-secondary)">
                    People connected with {isOwnFriendsPage ? "you" : user.name}
                  </p>
                </div>
              </div>

              <FriendsList
                friends={friendsFiltered}
                isOwnFriendsPage={isOwnFriendsPage}
                user={user}
                noFriendsFoundFromServer={friends.length === 0}
              />
            </section>
          </div>
        </main>
      );
    },

    <main className="content">
      <h1 className="text-3xl text-center mt-20 w-full">
        Oops, user not found
      </h1>
    </main>,
  );
};

export default FriendsPage;
