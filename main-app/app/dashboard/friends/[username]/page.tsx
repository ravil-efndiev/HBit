import { requestErrorWrapper } from "@/lib/misc";
import { publicServiceRequest } from "@/lib/requests";
import { PublicUser } from "@/lib/types";
import { type Metadata } from "next";

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
