"use client";
import { useClippingsCollection } from "@/lib/clippings-collection-provider";
import { AlbumArtwork } from "./album-artwork";

export function BooksCards() {
  const { clippingsCollection } = useClippingsCollection();

  const clippingsEntries = clippingsCollection
    ? Object.entries(clippingsCollection).slice(0, 4)
    : null;

  if (clippingsEntries != null) {
    return (
      <div className="flex flex-wrap gap-y-6 space-x-4 pb-4">
        {clippingsEntries.map(([slug, clippings]) => (
          <AlbumArtwork
            key={slug}
            album={{
              name: clippings[0]?.title ?? "",
              artist: clippings[0]?.author ?? "",
              cover:
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
