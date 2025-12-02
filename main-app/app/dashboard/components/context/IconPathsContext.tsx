"use client";

import { createContext, PropsWithChildren, useContext } from "react";

const IconPathsContext = createContext<string[] | null>(null);

interface Props extends PropsWithChildren {
  iconPaths: string[];
}

const IconPathsProvider = ({ iconPaths, children }: Props) => {
  return (
    <IconPathsContext.Provider value={iconPaths}>
      {children}
    </IconPathsContext.Provider>
  );
};

export default IconPathsProvider;

export const useIconPaths = () => {
  const context = useContext(IconPathsContext);

  if (!context) {
    throw new Error("IconPathContext can only be accessed from its provider");
  }

  return context;
};
