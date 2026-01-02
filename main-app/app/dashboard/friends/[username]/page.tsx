import { requestErrorWrapper } from "@/lib/misc";
import { publicServiceRequest, RequestError } from "@/lib/requests";
import { requireSessionUser } from "@/lib/session";
import { PublicUser } from "@/lib/types";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Friends - Habit tracker",
};

interface Props {
  params: Promise<{ username: string }>;
}

const FriendsPage = async ({ params }: Props) => {
  const { username } = await params;

  return requestErrorWrapper(
    [404],
    async () => {
      const res = await publicServiceRequest({
        endpoint: "/users",
        method: "GET",
        params: { username },
      });

      const user = res.publicUser;

      const { friends } = (await publicServiceRequest({
        endpoint: `/social/friends/${user.publicId}`,
        method: "GET",
      })) as { friends: PublicUser[] };

      return (
        <>
          <main className="content">
            <section className="panel">
              <ul className="flex flex-col gap-5">
                {friends.map((friend) => (
                  <li key={friend.publicId} className="display">
                    {friend.name}
                  </li>
                ))}
              </ul>
            </section>
          </main>
        </>
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
