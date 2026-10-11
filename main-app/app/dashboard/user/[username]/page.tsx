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
import { ArrowRight, Activity as ActivityIcon, UserRound } from "lucide-react";

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
        <main className="content h-full bg-gray-100">
          <div className="mx-auto grid w-full max-w-6xl gap-5 p-4 sm:p-6 lg:grid-cols-3 lg:p-8">
            <section className="panel my-0! h-fit overflow-hidden p-0 lg:col-span-1 lg:self-start">
              <div className="flex flex-col items-center px-6 py-8 text-center">
                <div className="mb-4 flex size-24 items-center justify-center rounded-full bg-(--col-primary-muted) ring-4 ring-white/70">
                  <ProfilePicture size={88} url={user.pfpUrl} />
                </div>
                <p className="mb-1 text-sm font-medium uppercase tracking-wider text-(--col-primary-dark)">
                  Profile
                </p>
                <h1 className="text-2xl font-semibold text-(--col-text-primary)">
                  {user.name}
                </h1>
                <p className="mt-1 text-(--col-text-secondary)">@{user.username}</p>
              </div>
              <div className="border-t border-gray-200 bg-(--col-background)/70 px-6 py-4 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-full bg-(--col-primary-muted) text-(--col-primary-dark)">
                    <UserRound size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-(--col-text-primary)">Activity profile</p>
                    <p className="text-xs text-(--col-text-secondary)">Public progress and habits</p>
                  </div>
                </div>
              </div>
            </section>
            <section className="panel my-0! p-4 sm:p-6 lg:col-span-2">
              <div className="mb-5 flex items-center gap-3 border-b border-gray-200 pb-4 dark:border-gray-700">
                <div className="flex size-10 items-center justify-center rounded-full bg-(--col-primary-muted) text-(--col-primary-dark)">
                  <ActivityIcon size={20} aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-xl font-medium text-(--col-text-primary)">Public activities</h2>
                  <p className="text-sm text-(--col-text-secondary)">
                    {activities.length} {activities.length === 1 ? "activity" : "activities"} shared
                  </p>
                </div>
              </div>
              {activities.length > 0 ? (
                <ul className="grid gap-3">
                  {activities.map((activity) => (
                    <li className="group relative rounded-lg border border-gray-200 bg-(--col-background) p-4 transition hover:border-(--col-primary-main) hover:shadow-sm dark:border-gray-700" key={activity.publicId}>
                      <div className="absolute -top-[1px] z-10"><BookmarkIcon color={activity.color} /></div>
                      <div className="pt-8 sm:pl-8 sm:pt-0">
                        <div className="flex items-start gap-4">
                          <Image src={activity.iconPath} alt="" width={40} height={40} className="shrink-0" />
                          <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-3">
                            <h3 className="truncate text-lg font-medium text-(--col-text-primary)">
                              {activity.name}
                              {activity.visibility === ActivityVisibility.FRIENDS_ONLY && (
                                <Image src="/star.svg" width={18} height={18} alt="Friends-only activity" className="ml-2 inline-block" />
                              )}
                            </h3>
                            <ArrowRight size={18} className="shrink-0 text-(--col-text-secondary) transition group-hover:translate-x-0.5 group-hover:text-(--col-primary-dark)" aria-hidden="true" />
                          </div>
                          </div>
                        </div>
                        <div className="mt-4 grid grid-cols-1 gap-2 border-t border-gray-200 pt-3 text-sm dark:border-gray-700 sm:grid-cols-3">
                            <div className="rounded-md bg-gray-100/70 px-3 py-2 dark:bg-gray-800/60">
                              <p className="text-xs font-medium uppercase tracking-wide text-(--col-text-secondary)">Total entries</p>
                              <p className="mt-1 text-lg font-semibold leading-none text-(--col-primary-dark)">{activity.totalEntries}</p>
                            </div>
                            <div className="rounded-md bg-gray-100/70 px-3 py-2 dark:bg-gray-800/60">
                              <p className="text-xs font-medium uppercase tracking-wide text-(--col-text-secondary)">Last week</p>
                              <p className="mt-1 text-lg font-semibold leading-none text-(--col-primary-dark)">{activity.lastWeekEntries}</p>
                            </div>
                            {activity.lastEntryTime && (
                              <div className="rounded-md bg-gray-100/70 px-3 py-2 dark:bg-gray-800/60">
                                <p className="text-xs font-medium uppercase tracking-wide text-(--col-text-secondary)">Last entry</p>
                                <p className="mt-1 text-sm font-semibold leading-tight text-(--col-primary-dark)">{new Date(activity.lastEntryTime).toLocaleDateString("cs-CZ")}</p>
                              </div>
                            )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="rounded-lg border border-dashed border-gray-300 px-6 py-12 text-center dark:border-gray-700">
                  <ActivityIcon size={30} className="mx-auto mb-3 text-(--col-text-secondary)" aria-hidden="true" />
                  <h3 className="font-medium text-(--col-text-primary)">No public activities</h3>
                  <p className="mt-1 text-sm text-(--col-text-secondary)">User isn&apos;t sharing any activities</p>
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
    </main>,
  );
};

export default UserPage;
