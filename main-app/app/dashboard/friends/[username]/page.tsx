import ProfilePicture from "@/components/ProfilePicture";
import { requestErrorWrapper } from "@/lib/misc";
import { publicServiceRequest } from "@/lib/requests";
import { getSessionUser } from "@/lib/session";
import { PublicUser } from "@/lib/types";
import { ArrowRight, Search, Users } from "lucide-react";
import { type Metadata } from "next";
import Link from "next/link";


interface Props {
  params: Promise<{ username: string }>;
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { username } = await params;
  return {
    title: `@${username} friend list - HBit`,
  };
};

const FriendsPage = async ({ params }: Props) => {
  const { username } = await params;
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
                  {friends.length} {friends.length === 1 ? "friend" : "friends"} in {isOwnFriendsPage ? "your" : "this"} network
                </p>
              </div>
              <label className="input input-bordered flex w-full items-center gap-2 bg-(--col-background) sm:max-w-xs">
                <Search size={18} className="text-(--col-text-secondary)" aria-hidden="true" />
                <span className="sr-only">Search friends</span>
                <input type="search" placeholder="Search friends" className="grow bg-transparent outline-none" />
              </label>
            </header>

            <section className="panel my-0! p-4 sm:p-6" aria-labelledby="friends-heading">
              <div className="mb-4 flex items-center gap-3 border-b border-gray-200 pb-4 dark:border-gray-700">
                <div className="flex size-10 items-center justify-center rounded-full bg-(--col-primary-muted) text-(--col-primary-dark)">
                  <Users size={20} aria-hidden="true" />
                </div>
                <div>
                  <h2 id="friends-heading" className="text-xl font-medium text-(--col-text-primary)">
                    Friends
                  </h2>
                  <p className="text-sm text-(--col-text-secondary)">
                    People connected with {isOwnFriendsPage ? "you" : user.name}
                  </p>
                </div>
              </div>

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
                        <ArrowRight size={18} className="shrink-0 text-(--col-text-secondary) transition group-hover:translate-x-0.5 group-hover:text-(--col-primary-dark)" aria-hidden="true" />
                        <span className="sr-only">View {friend.name}&apos;s profile</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 px-6 py-12 text-center dark:border-gray-700">
                  <Users size={30} className="mb-3 text-(--col-text-secondary)" aria-hidden="true" />
                  <h3 className="font-medium text-(--col-text-primary)">No friends yet</h3>
                  <p className="mt-1 max-w-sm text-sm text-(--col-text-secondary)">
                    When {isOwnFriendsPage ? "you connect" : `${user.name} connects`} with people, they&apos;ll appear here.
                  </p>
                </div>
              )}
            </section>
          </div>
        </main>
      );
    },

    <main className="content">
      <h1 className="text-3xl text-center mt-20 w-full">
        Oops, user not found
      </h1>
    </main>
  );
};

export default FriendsPage;
