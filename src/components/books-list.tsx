"use client";
import { BookCard } from "./book-card";
import { useBooksCollection } from "@/lib/clippings-collection-provider";

// HighlightList component
export const BooksList: React.FC<{}> = () => {
  const { booksCollection } = useBooksCollection();
  const slugs = booksCollection ? Object.entries(booksCollection).keys() : null;

  return (
    <div>
      <h2>List of Highlights</h2>
      <div className="grid-col-1 grid w-full gap-x-4 gap-y-6 lg:grid-cols-2 xl:grid-cols-3">
        {booksCollection
          ? Object.entries(booksCollection).map(([slug, book], index) => (
              <BookCard key={index} slug={slug} clippings={book.clippings} />
            ))
          : null}
      </div>
    </div>
  );
};
