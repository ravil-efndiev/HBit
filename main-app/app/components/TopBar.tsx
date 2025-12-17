import Image from "next/image";
import { Allerta_Stencil } from "next/font/google";
import Link from "next/link";
import Notifications from "./Notifications";
import { requireSessionUser } from "@/lib/session";
import ProfileNav from "./ProfileNav";

const font = Allerta_Stencil({ weight: ["400"] });

const TopBar = async () => {
  const user = await requireSessionUser();

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
        <div className="flex gap-3 items-center">
          <Notifications />
          <ProfileNav user={user} />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
