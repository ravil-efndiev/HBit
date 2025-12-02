"use client";

import { EntryWithType } from "@/lib/types";
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface EntriesContextType {
  entries: EntryWithType[];
  setEntries: Dispatch<SetStateAction<EntryWithType[]>>;
}

const EntriesContext = createContext<EntriesContextType | null>(null);

interface Props extends PropsWithChildren {
  initialEntries: EntryWithType[];
}

const EntriesProvider = ({ initialEntries, children }: Props) => {
  const [entries, setEntries] = useState(initialEntries);

  return (
    <EntriesContext.Provider value={{ entries, setEntries }}>
      {children}
    </EntriesContext.Provider>
  );
};

export default EntriesProvider;

export const useEntries = () => {
  const entry = useContext(EntriesContext);

  if (!entry) {
    throw new Error("EntriesContext can only be accessed from its provider");
  }

  return entry;
};
