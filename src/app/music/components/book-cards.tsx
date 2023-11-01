"use client";
import { useBooksCollection } from "@/lib/clippings-collection-provider";
import { AlbumArtwork } from "./album-artwork";

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
              cover:
                metadata?.image ??
                "https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=300&dpr=2&q=80",
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
