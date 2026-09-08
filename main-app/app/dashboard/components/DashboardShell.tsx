"use client";

import { usePathname } from "next/navigation";
import MobileSidebar from "./MobileSidebar";
import { PropsWithChildren } from "react";

interface DashboardShellProps extends PropsWithChildren {
  header: React.ReactNode;
  sidebar: React.ReactNode;
}

const DashboardShell = ({ children, header, sidebar }: DashboardShellProps) => {
  const pathname = usePathname();
  const showSidebar = pathname === "/dashboard";

  return (
    <>
      <MobileSidebar
        header={header}
        sidebar={showSidebar ? sidebar : null}
      />
      <div className="relative flex min-h-0 flex-1">
        {showSidebar && (
          <aside className="sticky top-16 z-10 hidden h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto border-r border-gray-300 bg-(--col-background) shadow-lg md:flex md:flex-col">
            {sidebar}
          </aside>
        )}
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </>
  );
};

export default DashboardShell;
