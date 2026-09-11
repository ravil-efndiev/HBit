"use client";

import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext } from "react";

export const layoutPanelIds = {
  dailyHabits: "dailyHabits",
  activityCallendar: "activityCallendar",
  weeklyHabits: "weeklyHabits",
} as const;

export type LayoutPanelId = keyof typeof layoutPanelIds;

interface LayoutItem {
  id: LayoutPanelId;
  order: number;
  visible: boolean;
}

export type Layout = LayoutItem[];

interface LayoutContextType {
  layout?: Layout;
  setLayout: Dispatch<SetStateAction<Layout | undefined>>;
}

const LayoutContext = createContext<LayoutContextType | null>(null);

interface Props extends PropsWithChildren, LayoutContextType {}

const LayoutProvider = ({ layout, setLayout, children }: Props) => {
  return (
    <LayoutContext.Provider value={{layout, setLayout}}>{children}</LayoutContext.Provider>
  );
};

export default LayoutProvider;

export const useLayout = () => {
  const context = useContext(LayoutContext);

  if (!context) {
    throw new Error("LayoutContext can only be accessed from its provider");
  }
  return context;
};
