"use client";

import { useRef, useState } from "react";
import useClickAwayListener from "../dashboard/components/hooks/useClickAwayListener";
import ProfilePicture from "./ProfilePicture";
import { User } from "@prisma/client";
import Link from "next/link";

interface Props {
  user: User;
}

const ProfileNav = ({ user }: Props) => {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const navLinks = {
    Profile: "/dashboard/profile",
    Dashboard: "/dashboard",
    Activities: "/dashboard/activities",
    Friends: "/friends",
  } as const;

  useClickAwayListener(
    navRef,
    () => {
      setOpen(false);
    },
    []
  );

  return (
    <div className="relative">
      <button className="cursor-pointer" onClick={() => setOpen(true)}>
        <ProfilePicture url={user.pfpUrl} size={24} />
      </button>
      {open && (
        <div className="panel absolute w-64 h-72 right-0" ref={navRef}>
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-lg"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
          <div className="flex gap-3">
            <ProfilePicture url={user.pfpUrl} size={30} />
            <div>
              <p>{user.name}</p>
              <p className="text-(--col-text-secondary)">@{user.username}</p>
            </div>
          </div>
          <nav className="mt-5 flex flex-col font-light gap-2">
            {Object.entries(navLinks).map(([name, path]) => (
              <Link
                className="hover:underline text-(--col-text-primary)!"
                href={path}
                key={name}
                onClick={() => setOpen(false)}
              >
                {name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};

export default ProfileNav;
