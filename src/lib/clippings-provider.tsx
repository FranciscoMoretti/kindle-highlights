import React, { createContext, ReactNode, useContext, useState } from "react";
import { ClippingsCollection } from "@/lib/types/clippings";

type ClippingsCollectionContextType = {
  clippingsByTitle: ClippingsCollection;
  setClippingsByTitle: (clippings: ClippingsCollection) => void;
};

const ClippingsCollectionContext = createContext<
  ClippingsCollectionContextType | undefined
>(undefined);

type ClippingsCollectionProviderProps = {
  children: ReactNode;
};

const ClippingsCollectionProvider: React.FC<
  ClippingsCollectionProviderProps
> = ({ children }) => {
  const [clippingsByTitle, setClippingsByTitle] = useState<ClippingsCollection>(
    new Map(),
  );

  return (
    <ClippingsCollectionContext.Provider
      value={{ clippingsByTitle, setClippingsByTitle }}
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
