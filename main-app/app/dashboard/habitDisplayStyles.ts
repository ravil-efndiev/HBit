export const habitDisplayStyles = {
  wrapper:
    "display grid grid-cols-[minmax(0,1fr)_auto_auto] min-[1200px]:flex min-[1200px]:flex-row min-[1200px]:gap-0!",
  iconTitleBlock:
    "col-span-3 row-start-1 flex w-fit max-w-full items-center justify-center gap-1 justify-self-center min-[1200px]:contents",
  icon: "h-10 w-10 sm:h-12 sm:w-12 min-[1200px]:h-[50px] min-[1200px]:w-[50px]",
  textBlock:
    "flex-2 ml-0 pr-2 text-center sm:ml-2 min-[1200px]:ml-5 min-[1200px]:text-left!",
  detailsText:
    "mx-auto max-w-[85%] text-(--col-text-secondary) min-[1200px]:mx-0!",
  mutedText: "text-(--col-text-secondary)",
  actionCell:
    "col-start-3 row-start-2 justify-self-end min-[1200px]:order-3 min-[1200px]:shrink-0",
} as const;
