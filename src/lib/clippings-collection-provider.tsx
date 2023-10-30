"use client";
import React, {
  createContext,
  type ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { type BooksCollection } from "@/lib/types/books-collection";

type BooksCollectionContextType = {
  booksCollection: BooksCollection | undefined;
  setBooksCollection: (booksCollection: BooksCollection) => void;
};

const BooksCollectionContext = createContext<
  BooksCollectionContextType | undefined
>(undefined);

type BooksCollectionProviderProps = {
  children: ReactNode;
};

const LOCAL_STORAGE_KEY = "booksData";

const BooksCollectionProvider: React.FC<BooksCollectionProviderProps> = ({
  children,
}) => {
  const localStorage =
    typeof window !== "undefined" ? window.localStorage : undefined;
  const [booksCollection, setBooksCollection] = useState<
    BooksCollection | undefined
  >(undefined);

  useEffect(() => {
    const storedData = localStorage?.getItem(LOCAL_STORAGE_KEY);
    if (storedData != undefined && storedData != "undefined") {
      if (storedData != null) {
        setBooksCollection(JSON.parse(storedData) as BooksCollection);
      } else {
        setBooksCollection({});
      }
    }
  }, []); // Runs once on component mount

  useEffect(() => {
    localStorage?.setItem(LOCAL_STORAGE_KEY, JSON.stringify(booksCollection));
  }, [booksCollection]);
  return (
    <BooksCollectionContext.Provider
      value={{
        booksCollection: booksCollection,
        setBooksCollection: setBooksCollection,
      }}
    >
      {children}
    </BooksCollectionContext.Provider>
  );
};

function useBooksCollection() {
  const context = useContext(BooksCollectionContext);
  if (context === undefined) {
    throw new Error(
      "useBooksCollection must be used within a BooksCollectionProvider",
    );
  }
  return context;
}

export { BooksCollectionProvider, useBooksCollection };
