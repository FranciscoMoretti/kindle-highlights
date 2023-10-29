"use client";
import { ClippingsCollection } from "@/lib/types/clippings";
import { BookCard } from "./book-card";
import { useClippingsCollection } from "@/lib/clippings-collection-provider";

// HighlightList component
export const BooksList: React.FC<{}> = () => {
  const { clippingsCollection } = useClippingsCollection();
  const titles = clippingsCollection.keys();

  return (
    <div>
      <h2>List of Highlights</h2>
      <div className="grid-col-1 grid w-full gap-x-4 gap-y-6 lg:grid-cols-2 xl:grid-cols-3">
        {clippingsCollection
          ? Array.from(clippingsCollection).map(([title, clippings], index) => (
              <BookCard key={index} slug={title} clippings={clippings} />
            ))
          : null}
      </div>
    </div>
  );
};
