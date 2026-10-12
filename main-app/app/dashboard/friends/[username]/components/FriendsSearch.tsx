"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter } from "next/dist/client/components/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const FriendsSearch = () => {
  const [search, setSearch] = useState("");
  const [searchDebounced] = useDebounce(search, 200);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    router.replace(searchDebounced ? `${pathname}?q=${encodeURIComponent(searchDebounced)}` : pathname);
  }, [searchDebounced]);

  return (
    <label className="input input-bordered flex w-full items-center gap-2 bg-(--col-background) sm:max-w-xs">
      <Search
        size={18}
        className="text-(--col-text-secondary)"
        aria-hidden="true"
      />
      <span className="sr-only">Search friends</span>
      <input
        type="search"
        placeholder="Search friends"
        className="grow bg-transparent outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </label>
  );
};

export default FriendsSearch;
