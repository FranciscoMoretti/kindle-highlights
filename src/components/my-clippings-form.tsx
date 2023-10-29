"use client";
import { FileInputForm } from "@/components/file-input-form";
import { readFile } from "@/lib/clippings-utils";
import { ClippingsCollection } from "@/lib/types/clippings";

import { useState } from "react";
import { HighlightList } from "./HighlightList";
import { useClippingsCollection } from "@/lib/clippings-provider";

export function MyClippingsForm() {
  const { clippingsCollection, setClippingsCollection } =
    useClippingsCollection();
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
      {clippingsCollection ? (
        <HighlightList clippings={clippingsCollection} />
      ) : null}
    </>
  );
}
