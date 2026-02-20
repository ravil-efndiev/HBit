"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import useClickAwayListener from "@/hooks/useClickAwayListener";
import useKeyDownListener from "@/hooks/useKeyDownListener";
import { useDebounce } from "use-debounce";
import { reqGet } from "@/lib/requests";
import { PublicUser, UserWithPublicId } from "@/lib/types";
import ProfilePicture from "./ProfilePicture";
import SendFriendRequestButton from "./SendFriendRequestButton";
import Link from "next/link";
import { areUsersFriends } from "@/actions/friendRequest.action";

interface Props {
  user: PublicUser;
}

const SearchPanel = ({ user }: Props) => {
  const [open, setOpen] = useState(false);
  const searchPanelRef = useRef<HTMLDivElement>(null);

  const [search, setSearch] = useState("");
  const [searchDebounced] = useDebounce(search, 300);

  const [foundUsers, setFoundUsers] = useState<
    (PublicUser & { areFriends: boolean })[]
  >([]);

  useClickAwayListener(searchPanelRef, () => setOpen(false));

  useKeyDownListener("Escape", () => setOpen(false));

  useEffect(() => {
    const search = async () => {
      try {
        const { foundUsers } = (await reqGet(
          `/api/users/search/${searchDebounced}`,
        )) as { foundUsers: PublicUser[] };

        const friendshipStatuses = await Promise.all(
          foundUsers.map((foundUser) =>
            areUsersFriends(user.publicId, foundUser.publicId),
          ),
        );

        const foundUsersWithStatuses = foundUsers.map((foundUser, i) => {
          if (!friendshipStatuses[i].ok)
            throw new Error("server action failed");
          return { ...foundUser, areFriends: friendshipStatuses[i].areFriends };
        });

        setFoundUsers(foundUsersWithStatuses);
      } catch (err) {
        console.error(err);
        setFoundUsers([]);
      }
    };

    if (!searchDebounced) {
      return setFoundUsers([]);
    }

    search();
  }, [searchDebounced]);

  useEffect(() => {
    if (!open) {
      setFoundUsers([]);
    }
  }, [open]);

  return (
    <>
      <button className="btn btn-ghost" onClick={() => setOpen(true)}>
        <Image src="/search.svg" alt="search" width={25} height={25} />
      </button>
      {open && (
        <>
          <div className="absolute top-0 left-0 z-20 w-screen h-screen overflow-hidden bg-[#86868655]"></div>
          <div
            className="panel m-0 bg-[#fdfdfdde] border-gray-800 absolute w-[94%] h-[90%] 
                      left-1/2 top-1/2 -translate-1/2 z-30 flex items-center flex-col gap-4"
            ref={searchPanelRef}
          >
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-lg"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
            <h1 className="w-full text-center text-2xl">Search</h1>
            <input
              type="text"
              placeholder="Search for users"
              className="input input-primary rounded-full text-lg font-light px-7 py-6 w-5/6"
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="flex flex-col items-center">
              {foundUsers.map((foundUser) => (
                <div
                  key={foundUser.publicId}
                  className="display w-md justify-between"
                >
                  <Link
                    href={`/dashboard/user/${foundUser.username}`}
                    className="flex text-inherit! gap-3"
                    onClick={() => setOpen(false)}
                  >
                    <ProfilePicture size={50} url={foundUser.pfpUrl} />
                    <div className="text-lg">
                      <p>{foundUser.name}</p>
                      <p className="text-(--col-text-secondary)">
                        @{foundUser.username}
                      </p>
                    </div>
                  </Link>
                  <SendFriendRequestButton
                    senderId={user.publicId}
                    recieverId={foundUser.publicId}
                    disabled={foundUser.areFriends}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SearchPanel;
