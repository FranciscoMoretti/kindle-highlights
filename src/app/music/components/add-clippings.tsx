import { FileInputForm } from "@/components/file-input-form";
import { Button } from "@/components/ui/button";
import { readFile } from "@/lib/clippings-utils";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useBooksCollection } from "@/lib/clippings-collection-provider";
import { useEffect, useState } from "react";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { produce } from "immer";
import {
  addClippingsToCollection,
  countCollectionClippings,
  getCollectionBookSlugs,
  getCollectionClippings,
} from "@/lib/utils/books-collection";
import { Clipping } from "@/lib/types/clippings";
import { Book, BooksCollection } from "@/lib/types/books-collection";
import { fetchSearchBookMetadata } from "@/lib/books-api";
import { BookMetadata } from "@/lib/types/book-metadata";

function DialogContentMyClippingsForm({
  handleReadBookCollection,
}: {
  handleReadBookCollection: (bookCollection: BooksCollection) => void;
}) {
  return (
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
          if (e[0]) {
            const readBooksCollection = await readFile(e[0]);
            handleReadBookCollection(readBooksCollection);
          }
        }}
      />
    </DialogContent>
  );
}

function DialogLoadedClippings({
  newBooksNumber,
  newClippingsNumber,
}: {
  newBooksNumber: number;
  newClippingsNumber: number;
}) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Clippings Loaded 🎉</DialogTitle>
        <DialogDescription>
          You've successfully uploaded a clippings file.
        </DialogDescription>
      </DialogHeader>
      <ul className="px-6">
        <li className="list-disc">{`${newBooksNumber} new books`}</li>
        <li className="list-disc">{`${newClippingsNumber} new clippings`}</li>
      </ul>
    </DialogContent>
  );
}

export function AddClippingsButton() {
  const { booksCollection, setBooksCollection } = useBooksCollection();
  const [formOpen, setFormOpen] = useState(false);

  return (
    <Dialog open={formOpen} onOpenChange={setFormOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="relative">
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          Add Clippings
        </Button>
      </DialogTrigger>
      <DialogContentMyClippingsForm
        handleReadBookCollection={async (readBooksCollection) => {
          let addedClippings: Clipping[] = [];
          let addedBooks: string[] = [];

          let newCollection: BooksCollection = {};
          if (booksCollection) {
            newCollection = produce(booksCollection, (draft) => {
              ({
                newClippingsAdded: addedClippings,
                newBooksAdded: addedBooks,
              } = addClippingsToCollection(draft, readBooksCollection));
            });
          } else {
            newCollection = readBooksCollection;
            addedClippings = getCollectionClippings(readBooksCollection);
            addedBooks = getCollectionBookSlugs(readBooksCollection);
          }

          console.log(`Read ${addedClippings.length} clippings`);
          console.log(`Read ${addedBooks.length} books`);
          setFormOpen(false);
          const newBooks2 = addedBooks.slice(0, 2);

          const bookMetadataPromises = newBooks2.map(async (bookSlug) =>
            fetchBookMetadataFromSlug(newCollection, bookSlug),
          );

          const booksMetadata = await Promise.all(bookMetadataPromises);
          console.log({ bookMetadata: booksMetadata });
          if (booksMetadata.length !== newBooks2.length) {
            console.error(
              "Unexpected mismatched lengths of bookMetadata and newBooks",
            );
          } else {
            if (newCollection && booksMetadata && newBooks2)
              setBooksCollection(
                updateMetadataForAddedBooks({
                  currentBooksCollection: newCollection,
                  addedBookMetadata: booksMetadata,
                  addedBooks: newBooks2,
                }),
              );
          }
        }}
      />
    </Dialog>
  );
}

async function fetchBookMetadataFromSlug(
  booksCollection: BooksCollection | undefined,
  bookSlug: string,
): Promise<BookMetadata | null | undefined> {
  console.log({ booksCollection });
  const { title, author } =
    (booksCollection && booksCollection[bookSlug]?.clippings[0]) || {};

  console.log({ title, author });

  if (title && author) {
    return fetchSearchBookMetadata(title, author);
  }

  return null;
}

function updateMetadataForAddedBooks({
  currentBooksCollection,
  addedBooks,
  addedBookMetadata,
}: {
  currentBooksCollection: BooksCollection;
  addedBooks: string[];
  addedBookMetadata: (BookMetadata | null | undefined)[];
}) {
  return produce(currentBooksCollection, (draft) => {
    addedBookMetadata.forEach((metadata, index) => {
      if (metadata) {
        const newBookSlug = addedBooks[index];
        const bookDraft = newBookSlug ? draft[newBookSlug] : undefined;
        if (bookDraft) {
          bookDraft.metadata = metadata;
          console.log(`Added metadata ${metadata} to ${newBookSlug}`);
        }
      }
    });
  });
}
