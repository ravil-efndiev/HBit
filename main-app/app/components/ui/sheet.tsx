"use client";

import { Drawer } from "@base-ui/react/drawer";
import { cn } from "cn";
import type { ComponentProps } from "react";

export const Sheet = Drawer.Root;
export const SheetTrigger = Drawer.Trigger;
export const SheetClose = Drawer.Close;

export const SheetContent = ({
  className,
  children,
  ...props
}: ComponentProps<typeof Drawer.Popup>) => (
  <Drawer.Portal>
    <Drawer.Backdrop className="fixed inset-0 z-40 bg-black/20" />
    <Drawer.Popup
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-[min(20rem,85vw)] flex-col border-r border-gray-300 bg-(--col-background) shadow-xl outline-none",
        className
      )}
      {...props}
    >
      <Drawer.Content className="flex min-h-0 flex-1 flex-col overflow-y-auto">
        {children}
      </Drawer.Content>
    </Drawer.Popup>
  </Drawer.Portal>
);

export const SheetTitle = Drawer.Title;
export const SheetDescription = Drawer.Description;
