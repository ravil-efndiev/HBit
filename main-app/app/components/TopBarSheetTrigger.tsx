"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";

export const TopBarSheetTrigger = () => {
  const pathname = usePathname();

  return pathname === "/dashboard" && (
    <SheetTrigger
      render={
        <Button
          className="md:hidden"
          variant="ghost"
          size="icon"
          aria-label="Open navigation menu"
        />
      }
      >
      <Menu />
    </SheetTrigger>
  );
}
