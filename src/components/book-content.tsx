"use client";
import { useClippingsCollection } from "../lib/clippings-collection-provider";
import { HighlightsList } from "./highlights-list";

export default function BookContent({ slug }: { slug: string }) {
  const { clippingsCollection } = useClippingsCollection();
  const bookClippings = clippingsCollection?.get(slug)
    ? clippingsCollection.get(slug)
    : null;
  return (
    <>
      {bookClippings ? (
        <>
          <div>Book: {bookClippings[0]?.title}</div>
          <HighlightsList clippings={bookClippings} />
        </>
      ) : (
        <div>Book not found for slug {slug}</div>
      )}
    </>
  );
}
