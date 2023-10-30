"use client";
import { useBooksCollection } from "../lib/clippings-collection-provider";
import { HighlightsList } from "./highlights-list";

export default function BookContent({ slug }: { slug: string }) {
  const { booksCollection: booksCollection } = useBooksCollection();
  const book = booksCollection?.[slug] ? booksCollection[slug] : null;
  return (
    <>
      {book ? (
        <>
          <div>Book: {book.clippings[0]?.title}</div>
          <HighlightsList clippings={book.clippings} />
        </>
      ) : (
        <div>Book not found for slug {slug}</div>
      )}
    </>
  );
}
