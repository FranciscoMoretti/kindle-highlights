import { type Clipping } from "@/lib/types/clippings";

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/2BSF6Vtpiny
 */
export function HighlightsList({ clippings }: { clippings: Clipping[] }) {
  return (
    <div className="px-4 py-6 md:px-6 md:py-12 lg:py-16">
      <ul className="space-y-4">
        {clippings.map((clipping, index) => (
          <li
            key={index}
            className="rounded-lg bg-white p-4 shadow dark:bg-zinc-950"
          >
            <h2 className="mb-2 text-xl font-bold">{clipping.title}</h2>
            <h3 className="mb-4 text-lg text-gray-500">by {clipping.author}</h3>
            <p className="mb-4 text-gray-700 dark:text-white">
              {clipping.text}
            </p>
            <p className="text-sm text-gray-400">
              Highlighted on {clipping.timestamp}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
