import Image from "next/image";
import { Allerta_Stencil } from "next/font/google";
import Link from "next/link";
import Notifications from "./Notifications";
import { getSessionUser } from "@/lib/session";
import ProfileNav from "./ProfileNav";
import SearchPanel from "./SearchPanel";
import { ParsedNotification } from "@/lib/types";
import { prisma } from "@/lib/prisma";
import NotificationsProvider from "./context/NotificationsProvider";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SheetTrigger } from "@/components/ui/sheet";

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
        <header className="sticky top-0 z-40 flex h-16 w-full items-center border-b border-gray-300 bg-background/95 px-4 shadow-sm backdrop-blur md:px-6">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <SheetTrigger
                render={
                  <Button
                    className="md:hidden"
                    variant="ghost"
                    size="icon"
                    aria-label="Open navigation menu"
                  />
                }
              >
                <Menu />
              </SheetTrigger>
              <Link className="shrink-0" href="/dashboard">
                <div className="flex items-center gap-2">
                <Image src="/logo.png" width={40} height={40} alt="logo" />
                <h1
                  className={`text-2xl text-(--col-primary-dark) ${font.className}`}
                >
                  HBit
                </h1>
                </div>
              </Link>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <SearchPanel user={user} />
              <Notifications user={user} />
              <ProfileNav user={user} />
            </div>
          </div>
        </header>
      </NotificationsProvider>
    );
  } else {
    return (
      <header className="sticky top-0 z-40 flex h-16 w-full items-center border-b border-gray-300 bg-background/95 px-4 shadow-sm backdrop-blur md:px-6">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
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
      </header>
    );
  }
};

export default TopBar;
