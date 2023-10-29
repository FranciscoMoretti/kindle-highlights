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
  clippingsCollection: ClippingsCollection;
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
  const [clippingsCollection, setClippingsCollection] =
    useState<ClippingsCollection>(() => {
      const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      return storedData ? new Map(JSON.parse(storedData)) : new Map();
    });

  useEffect(() => {
    // Serialize and store the data in localStorage whenever clippingsByTitle changes
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(Array.from(clippingsCollection.entries())),
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
