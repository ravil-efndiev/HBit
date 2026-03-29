import Image from "next/image";
import { Allerta_Stencil } from "next/font/google";
import Link from "next/link";
import Notifications from "./Notifications";
import { getSessionUser, requireSessionUser } from "@/lib/session";
import ProfileNav from "./ProfileNav";
import SearchPanel from "./SearchPanel";
import { ParsedNotification } from "@/lib/types";
import { prisma } from "@/lib/prisma";
import NotificationsProvider from "./context/NotificationsProvider";

const font = Allerta_Stencil({ weight: ["400"] });

const TopBar = async () => {
  const user = await getSessionUser();

  if (user) {
    const notificaitons: ParsedNotification[] = (
      await prisma.notification.findMany({
        where: { userId: user.id },
      })
    ).map((notification) => ({
      id: notification.id,
      type: notification.type,
      recievedAt: notification.createdAt,
      payload: JSON.parse(notification.payload!.toString()),
    }));

    return (
      <NotificationsProvider
        initialNotifications={notificaitons}
        userPublicId={user.publicId}
      >
        <div
          className={`w-full py-3 shadow-sm border-b border-b-gray-300 z-20`}
        >
          <div className="max-w-[96%] mx-auto flex items-center justify-between">
            <Link href="/dashboard">
              <div className="flex gap-3 items-center">
                <Image src="/logo.png" width={40} height={40} alt="logo" />
                <h1
                  className={`text-2xl text-(--col-primary-dark) ${font.className}`}
                >
                  HBit
                </h1>
              </div>
            </Link>
            <div className="flex gap-3 items-center">
              <SearchPanel user={user} />
              <Notifications user={user} />
              <ProfileNav user={user} />
            </div>
          </div>
        </div>
      </NotificationsProvider>
    );
  } else {
    return (
      <div className={`w-full py-3 shadow-sm border-b border-b-gray-300 z-20`}>
        <div className="max-w-[96%] mx-auto flex items-center justify-between">
          <Link href="/dashboard">
            <div className="flex gap-3 items-center">
              <Image src="/logo.png" width={40} height={40} alt="logo" />
              <h1
                className={`text-2xl text-(--col-primary-dark) ${font.className}`}
              >
                HBit
              </h1>
            </div>
          </Link>
          <Link
            className="btn btn-primary text-(--col-background)!"
            href="/auth/signin"
          >
            Sing In
          </Link>
        </div>
      </div>
    );
  }
};

export default TopBar;
