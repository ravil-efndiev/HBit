"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import useClickAwayListener from "../dashboard/components/hooks/useClickAwayListener";

const Notifications = () => {
  const [open, setOpen] = useState(false);
  const notifsRef = useRef<HTMLDivElement>(null);

  useClickAwayListener(
    notifsRef,
    () => {
      setOpen(false);
    },
    []
  );

  return (
    <div className="relative">
      <button className="btn btn-ghost" onClick={() => setOpen(true)}>
        <Image src="/bell.svg" alt="notifications" width={25} height={25} />
      </button>
      {open && (
        <div className="panel absolute w-sm h-72 right-0" ref={notifsRef}>
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-lg"
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
          <p className="w-full text-center text-xl">Notifications</p>
        </div>
      )}
    </div>
  );
};

export default Notifications;
