"use client";
import { useBooksCollection } from "@/lib/clippings-collection-provider";
import { AlbumArtwork } from "./album-artwork";

const IMAGE_NOT_AVAILABLE =
  "https://books.google.com/books/content?id=xcmSAQAACAAJ&printsec=frontcover&img=1&zoom=2&source=gbs_api";

export function BooksCards() {
  const { booksCollection } = useBooksCollection();

  const book = booksCollection
    ? Object.entries(booksCollection).slice(0, 4)
    : null;

  if (book != null) {
    return (
      <div className="flex flex-wrap gap-y-6 space-x-4 pb-4">
        {book.map(([slug, { metadata, clippings }]) => (
          <AlbumArtwork
            key={slug}
            album={{
              name: metadata?.title ?? clippings[0]?.title ?? "",
              artist: metadata?.author ?? clippings[0]?.author ?? "",
              cover: metadata?.image ?? IMAGE_NOT_AVAILABLE,
            }}
            slug={slug}
            className="w-[250px]"
            aspectRatio="portrait"
            width={250}
            height={330}
          />
        ))}
      </div>
    );
  }
}
