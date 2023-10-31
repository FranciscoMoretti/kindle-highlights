import { FileInputForm } from "@/components/file-input-form";
import { MyClippingsForm } from "@/components/my-clippings-form";
import { Button } from "@/components/ui/button";
import { readFile } from "@/lib/clippings-utils";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBooksCollection } from "@/lib/clippings-collection-provider";
import { useState } from "react";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { produce } from "immer";
import {
  addClippingsToCollection,
  countClippingsInCollection,
} from "@/lib/utils/books-collection";

export function AddClippingsButton() {
  const [open, setOpen] = useState(false);

  const { booksCollection, setBooksCollection } = useBooksCollection();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="relative">
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          Add Clippings
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Clippings</DialogTitle>
          <DialogDescription>Upload your Kindle clippings.</DialogDescription>
        </DialogHeader>
        <FileInputForm
          label={"Clippings File"}
          description={"Kindle storage: 'Kindle/documents/My Clippings.txt'"}
          submitButtonText={"Import Clippings"}
          handleSubmit={async (e) => {
            const newBooksColleciton = await readFile(e[0]);
            if (newBooksColleciton) {
              let newClippingsNumber = 0;
              if (booksCollection) {
                setBooksCollection(
                  produce(booksCollection, (draft) => {
                    newClippingsNumber = addClippingsToCollection(
                      draft,
                      newBooksColleciton,
                    );
                  }),
                );
              } else {
                setBooksCollection(newBooksColleciton);
                newClippingsNumber =
                  countClippingsInCollection(newBooksColleciton);
              }
              console.log(`Added ${newClippingsNumber} clippings`);
              setOpen(false);
            }
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
