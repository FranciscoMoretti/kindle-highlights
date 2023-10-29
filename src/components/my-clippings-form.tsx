"use client";
import { FileInputForm } from "@/components/file-input-form";
import { readFile } from "@/lib/clippings-utils";

import { useClippingsCollection } from "@/lib/clippings-collection-provider";

export function MyClippingsForm() {
  const { setClippingsCollection } = useClippingsCollection();
  return (
    <>
      <FileInputForm
        label={"Clippings"}
        description={"Upload you My Clippings.txt file"}
        handleSubmit={async (e) => {
          const groupedClippings = await readFile(e[0]);
          if (groupedClippings) {
            setClippingsCollection(groupedClippings);
          }
        }}
      />
    </>
  );
}
