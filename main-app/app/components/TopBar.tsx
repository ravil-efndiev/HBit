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

const topBarStyles = {
  wrapper: "sticky top-0 z-40 flex h-16 w-full items-center border-b border-gray-300 bg-background/95 px-4 shadow-sm backdrop-blur md:px-6",
  inner: "mx-auto flex w-full max-w-7xl items-center justify-between gap-3",
  leftSection: "flex min-w-0 items-center gap-3",
  brand: "flex items-center gap-2",
  brandText: `text-2xl text-(--col-primary-dark) ${font.className}`,
  rightSection: "flex shrink-0 items-center gap-3",
  authInner: "mx-auto flex w-full max-w-7xl items-center justify-between",
  authBrand: "flex items-center gap-3",
  authButton: "btn btn-primary text-(--col-background)!",
} as const;

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
        <header className={topBarStyles.wrapper}>
          <div className={topBarStyles.inner}>
            <div className={topBarStyles.leftSection}>
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
                <div className={topBarStyles.brand}>
                  <Image
                    src="/logo.png"
                    width={40}
                    height={40}
                    alt="logo"
                  />
                  <h1 className={topBarStyles.brandText}>HBit</h1>
                </div>
              </Link>
            </div>
            <div className={topBarStyles.rightSection}>
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
      <header className={topBarStyles.wrapper}>
        <div className={topBarStyles.authInner}>
          <Link href="/dashboard">
            <div className={topBarStyles.authBrand}>
              <Image src="/logo.png" width={40} height={40} alt="logo" />
              <h1 className={topBarStyles.brandText}>HBit</h1>
            </div>
          </Link>
          <Link className={topBarStyles.authButton} href="/auth/signin">
            Sing In
          </Link>
        </div>
      </header>
    );
  }
};

export default TopBar;
