import ProfilePicture from "@/components/ProfilePicture";
import { requestErrorWrapper } from "@/lib/misc";
import { publicServiceRequest } from "@/lib/requests";
import { PublicActivity, PublicUser } from "@/lib/types";
import { Metadata } from "next";

interface Props {
  params: Promise<{ username: string }>;
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { username } = await params;
  return {
    title: `@${username} profile - HBit`,
  };
};

const UserPage = async ({ params }: Props) => {
  const { username } = await params;

  return requestErrorWrapper(
    [404],
    async () => {
      const { publicUser: user } = (await publicServiceRequest({
        endpoint: "/users",
        method: "GET",
        params: { username },
      })) as { publicUser: PublicUser };

      const { activities } = (await publicServiceRequest({
        endpoint: "/public-activities/user",
        method: "GET",
        params: { publicId: user.publicId },
      })) as { activities: PublicActivity[] };

      return (
        <main className="content">
          <div className="w-[96%] flex mx-auto gap-5 my-6">
            <section className="panel flex-1 flex flex-col items-center my-0!">
              <div className="flex mx-auto justify-center gap-7 my-4">
                <ProfilePicture size={100} url={user.pfpUrl} />
                <div className="my-auto">
                  <h2 className="text-3xl font-semibold">{user.name}</h2>
                  <h3 className="text-xl">@{user.username}</h3>
                </div>
              </div>
            </section>
            <section className="panel flex flex-col flex-3 items-center my-0!">
              <h1 className="panel-title">Public activities</h1>
              {activities.length > 0 ? (
                <ul className="">
                  {activities.map((activity) => (
                    <li key={activity.publicId}>{activity.name}</li>
                  ))}
                </ul>
              ) : (
                <h3>User isn't sharing any activities</h3>
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
    </main>,
  );
};

export default UserPage;
