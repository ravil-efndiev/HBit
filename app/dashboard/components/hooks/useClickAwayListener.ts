import { RefObject, useEffect } from "react";

const useClickAwayListener = <RefT extends HTMLElement>(
  ref: RefObject<RefT | null>,
  onClickaway: () => void,
  dependencies: any[],
) => {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickaway();
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, dependencies);
};

export default useClickAwayListener;
