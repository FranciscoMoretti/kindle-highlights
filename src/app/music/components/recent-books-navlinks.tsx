import { Button } from "@/components/ui/button";
import { useBooksCollection } from "@/lib/clippings-collection-provider";
import Link from "next/link";

export function RecentBooksNavlinks() {
  const { booksCollection } = useBooksCollection();

  // TODO: Should sort by date
  const clippingsEntries = booksCollection
    ? Object.entries(booksCollection)
    : null;

  if (clippingsEntries != null) {
    return (
      <div className="space-y-1 p-2">
        {clippingsEntries.map(([slug, { clippings }], i) => (
          <Link href={"/book/" + slug} key={slug}>
            <Button
              key={`${slug}`}
              variant="ghost"
              className="w-full justify-start font-normal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4"
              >
                <path d="M21 15V6" />
                <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                <path d="M12 12H3" />
                <path d="M16 6H3" />
                <path d="M12 18H3" />
              </svg>
              {clippings[0]?.title
                ? clippings[0].title.length < 40
                  ? clippings[0].title
                  : clippings[0].title.slice(0, 37) + "..."
                : "Title not found"}
            </Button>
          </Link>
        ))}
      </div>
    );
  }
}
