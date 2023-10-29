"use client";
import React, {
  createContext,
  type ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { type ClippingsCollection } from "@/lib/types/clippings";

type ClippingsCollectionContextType = {
  clippingsCollection: ClippingsCollection | undefined;
  setClippingsCollection: (clippings: ClippingsCollection) => void;
};

const ClippingsCollectionContext = createContext<
  ClippingsCollectionContextType | undefined
>(undefined);

type ClippingsCollectionProviderProps = {
  children: ReactNode;
};

const LOCAL_STORAGE_KEY = "clippingsData";

const ClippingsCollectionProvider: React.FC<
  ClippingsCollectionProviderProps
> = ({ children }) => {
  const localStorage =
    typeof window !== "undefined" ? window.localStorage : undefined;
  const [clippingsCollection, setClippingsCollection] = useState<
    ClippingsCollection | undefined
  >(undefined);

  useEffect(() => {
    const storedData = localStorage?.getItem(LOCAL_STORAGE_KEY);
    if (storedData && storedData != "undefined") {
      setClippingsCollection(JSON.parse(storedData) as ClippingsCollection);
    }
  }, []); // Runs once on component mount

  useEffect(() => {
    localStorage?.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(clippingsCollection),
    );
  }, [clippingsCollection]);
  return (
    <ClippingsCollectionContext.Provider
      value={{
        clippingsCollection,
        setClippingsCollection,
      }}
    >
      {children}
    </ClippingsCollectionContext.Provider>
  );
};

function useClippingsCollection() {
  const context = useContext(ClippingsCollectionContext);
  if (context === undefined) {
    throw new Error(
      "useClippingsCollection must be used within a ClippingsCollectionProvider",
    );
  }
  return context;
}

export { ClippingsCollectionProvider, useClippingsCollection };
