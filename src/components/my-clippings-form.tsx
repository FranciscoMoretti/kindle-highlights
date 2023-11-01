"use client";
import { FileInputForm } from "@/components/file-input-form";
import { readFile } from "@/lib/clippings-utils";

import { useBooksCollection } from "@/lib/clippings-collection-provider";

export function MyClippingsForm() {
  const { setBooksCollection } = useBooksCollection();
  return (
    <>
      <FileInputForm
        label={"Clippings File"}
        description={
          "Located in kindle storage at 'Kindle/documents/My Clippings.txt'"
        }
        handleSubmit={async (e) => {
          if (e[0]) {
            const groupedClippings = await readFile(e[0]);
            if (groupedClippings) {
              setBooksCollection(groupedClippings);
            }
          }
        }}
      />
    </>
  );
}
