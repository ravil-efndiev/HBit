"use client";

import { PropsWithChildren, RefObject, useRef } from "react";
import useClickAwayListener from "./hooks/useClickAwayListener";

interface Props extends PropsWithChildren {
  dialogRef: RefObject<HTMLDialogElement | null>;
  top?: string | number;
  left?: string | number;
  width?: string | number;
}

const ModalWrapper = ({ dialogRef, top, left, width, children }: Props) => {
  const contentBoxRef = useRef<HTMLDivElement>(null);

  useClickAwayListener<HTMLDivElement>(contentBoxRef, () => {
    dialogRef.current?.close();
  });

  return (
    <dialog ref={dialogRef} className="modal">
      <div
        className="modal-box absolute"
        ref={contentBoxRef}
        style={{ top, left, width }}
      >
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-lg"
          onClick={() => dialogRef.current?.close()}
        >
          ✕
        </button>
        {children}
      </div>
    </dialog>
  );
};

export default ModalWrapper;
