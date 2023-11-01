import { type BooksCollection } from "../types/books-collection";
import { type Clipping } from "../types/clippings";

export function addClippingsToCollection(
  currentBooksCollection: BooksCollection,
  newBooksCollection: BooksCollection,
): { newClippingsAdded: Clipping[]; newBooksAdded: string[] } {
  const newClippingsAdded = [];
  const newBooksAdded = [];

  for (const [newBookTitle, newBook] of Object.entries(newBooksCollection)) {
    if (!currentBooksCollection[newBookTitle]) {
      currentBooksCollection[newBookTitle] = newBook;
      newBooksAdded.push(newBookTitle);
      newClippingsAdded.push(...newBook.clippings);
    } else {
      for (const newClipping of newBook.clippings) {
        if (
          !currentBooksCollection[newBookTitle]?.clippings.some(
            (existingClipping) => existingClipping.text === newClipping.text,
          )
        ) {
          currentBooksCollection[newBookTitle]?.clippings.push(newClipping);
          newClippingsAdded.push(newClipping);
        }
      }
    }
  }

  return { newClippingsAdded, newBooksAdded };
}

export function countCollectionClippings(
  booksCollection: BooksCollection,
): number {
  return getCollectionClippings(booksCollection).length;
}

export function getCollectionClippings(booksCollection: BooksCollection) {
  return Object.values(booksCollection).flatMap((book) => book.clippings);
}

export function getCollectionBookSlugs(booksCollection: BooksCollection) {
  return Object.keys(booksCollection);
}
