import { useEffect } from "react";

const useKeyDownListener = (
  key: string,
  onKeyDown: () => void,
  dependencies: any[] = []
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === key) {
        onKeyDown();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, dependencies);
};

export default useKeyDownListener;
