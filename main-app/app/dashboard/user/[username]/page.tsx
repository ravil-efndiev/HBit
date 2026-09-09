import ProfilePicture from "@/components/ProfilePicture";
import { areUsersFriends } from "@/actions/friendRequest.action";
import BookmarkIcon from "@/dashboard/activities/components/BookmarkIcon";
import { requestErrorWrapper } from "@/lib/misc";
import { publicServiceRequest } from "@/lib/requests";
import { getSessionUser } from "@/lib/session";
import { PublicActivity, PublicUser } from "@/lib/types";
import { Metadata } from "next";
import Image from "next/image";
import { ActivityVisibility } from "@prisma/client";

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

      const { activities: userActivities } = (await publicServiceRequest({
        endpoint: "/public-activities/user",
        method: "GET",
        params: { publicId: user.publicId },
      })) as {
        activities: (PublicActivity & {
          visibility?: "PUBLIC" | "FRIENDS_ONLY";
        })[];
      };

      const hasFriendsOnlyActivities = userActivities.some(
        (activity) => activity.visibility === "FRIENDS_ONLY",
      );
      let areFriends = false;

      if (hasFriendsOnlyActivities) {
        const viewer = await getSessionUser();
        areFriends =
          viewer?.publicId === user.publicId
            ? true
            : viewer
              ? await areUsersFriends(viewer.publicId, user.publicId).then(
                  (result) => {
                    if (!result.ok) throw new Error(result.error);
                    return result.areFriends;
                  },
                )
              : false;
      }

      const activities = userActivities.filter(
        (activity) =>
          activity.visibility !== ActivityVisibility.FRIENDS_ONLY ||
          areFriends,
      );

      return (
        <main className="content">
          <div className="mx-auto grid w-full max-w-7xl gap-5 p-4 sm:p-6 lg:grid-cols-3 lg:p-8">
            <section className="panel my-0! flex flex-col items-center lg:col-span-1">
              <div className="my-4 flex justify-center gap-7">
                <ProfilePicture size={100} url={user.pfpUrl} />
                <div className="my-auto">
                  <h2 className="text-3xl font-semibold">{user.name}</h2>
                  <h3 className="text-xl">@{user.username}</h3>
                </div>
              </div>
            </section>
            <section className="panel my-0! flex flex-col items-center lg:col-span-2">
              <h1 className="panel-title">Shared activities</h1>
              {activities.length > 0 ? (
                <ul className="">
                  {activities.map((activity) => (
                    <li
                      className="display flex flex-col py-7 font-light relative"
                      key={activity.publicId}
                    >
                      <div className="absolute top-0 left-3">
                        <BookmarkIcon color={activity.color} />
                      </div>
                      <div className="flex gap-4 my-auto items-center">
                        <Image
                          src={activity.iconPath}
                          alt="icon"
                          width={40}
                          height={40}
                        />
                        <h4 className="text-2xl font-normal flex">
                          {activity.name}
                          {activity.visibility ===
                            ActivityVisibility.FRIENDS_ONLY && (
                            <Image
                              src="/star.svg"
                              width={20}
                              height={20}
                              alt="friends-only"
                            />
                          )}
                        </h4>
                      </div>
                      <p>
                        total entries:{" "}
                        <span className="text-(--col-primary-dark)">
                          {activity.totalEntries}
                        </span>
                      </p>
                      <p>
                        last week entries:{" "}
                        <span className="text-(--col-primary-dark)">
                          {activity.lastWeekEntries}
                        </span>
                      </p>
                      <p>
                        {activity.lastEntryTime && (
                          <>
                            Last entry:{" "}
                            <span className="text-(--col-primary-dark)">
                              {new Date(
                                activity.lastEntryTime,
                              ).toLocaleDateString("cs-CZ")}
                            </span>
                          </>
                        )}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <h3>User isn&apos;t sharing any activities</h3>
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
