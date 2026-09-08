"use client";

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

interface Props {
  header: React.ReactNode;
  sidebar: React.ReactNode;
}

const MobileSidebar = ({ header, sidebar }: Props) => {
  return (
    <Sheet>
      {header}
      <SheetContent>
        <SheetTitle className="sr-only">Dashboard navigation</SheetTitle>
        {sidebar}
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;