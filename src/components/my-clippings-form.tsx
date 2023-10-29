"use client";
import { FileInputForm } from "@/components/file-input-form";
import { readFile } from "@/lib/clippings-utils";
import { ClippingsCollection } from "@/lib/types/clippings";

import { useState } from "react";
import { HighlightList } from "./HighlightList";

export function MyClippingsForm() {
  const [clippingsByTitle, setClippingsByTitle] =
    useState<ClippingsCollection | null>(null);
  return (
    <>
      <FileInputForm
        label={"Clippings"}
        description={"Upload you My Clippings.txt file"}
        handleSubmit={async (e) => {
          const groupedClippings = await readFile(e[0]);
          if (groupedClippings) {
            setClippingsByTitle(groupedClippings);
          }
        }}
      />
      {clippingsByTitle ? <HighlightList clippings={clippingsByTitle} /> : null}
    </>
  );
}
