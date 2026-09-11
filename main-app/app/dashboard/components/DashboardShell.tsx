"use client";

import { usePathname } from "next/navigation";
import MobileSidebar from "./MobileSidebar";
import { PropsWithChildren, useEffect, useState } from "react";
import LayoutProvider, { Layout, layoutPanelIds } from "./context/LayoutContext";

interface Props extends PropsWithChildren {
  header: React.ReactNode;
  sidebar: React.ReactNode;
}

const validateJSONLayoutEl = (el: any) => 
    el !== null && typeof el === "object" &&
    "id" in el && "order" in el && "visible" in el;

const defaultLayout: Layout = [
  { id: layoutPanelIds.dailyHabits, order: 0, visible: true },
  { id: layoutPanelIds.activityCallendar, order: 1, visible: true },
  { id: layoutPanelIds.weeklyHabits, order: 2, visible: true },
];

const DashboardShell = ({ children, header, sidebar }: Props) => {
  const pathname = usePathname();
  const showSidebar = pathname === "/dashboard";

  const [layout, setLayout] = useState<Layout>();

  useEffect(() => {
    const layout = localStorage.getItem("layout");
    const defaultLayoutCpy = defaultLayout.map((el) => ({ ...el }));
    if (!layout) 
      return setLayout(defaultLayoutCpy);

    const parsed = JSON.parse(layout);
    if (!Array.isArray(parsed) || !parsed.every(validateJSONLayoutEl)) 
      return setLayout(defaultLayoutCpy);

    setLayout(parsed as Layout);

  }, [validateJSONLayoutEl]);

  return (
    <LayoutProvider layout={layout} setLayout={setLayout}>
      <MobileSidebar
        header={header}
        sidebar={showSidebar ? sidebar : null}
      />
      <div className="relative flex min-h-0 flex-1">
        {showSidebar && (
          <aside className="sticky top-16 z-10 hidden h-[calc(100vh-4rem)] w-72 shrink-0 overflow-y-scroll border-r border-gray-300 bg-(--col-background) shadow-lg md:flex md:flex-col">
            {sidebar}
          </aside>
        )}
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </LayoutProvider>
  );
};

export default DashboardShell;
