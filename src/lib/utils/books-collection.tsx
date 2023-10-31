import { BooksCollection } from "../types/books-collection";

export function addClippingsToCollection(
  currentBooksCollection: BooksCollection,
  newBooksCollection: BooksCollection,
): number {
  let clippingsAdded = 0;

  for (const [newBookTitle, newBook] of Object.entries(newBooksCollection)) {
    if (!currentBooksCollection[newBookTitle]) {
      currentBooksCollection[newBookTitle] = newBook;
      clippingsAdded += newBook.clippings.length;
    } else {
      // Check if clippings already exist and add new ones
      for (const newClipping of newBook.clippings) {
        if (
          !currentBooksCollection[newBookTitle]?.clippings.some(
            (existingClipping) => existingClipping.text === newClipping.text,
          )
        ) {
          currentBooksCollection[newBookTitle]?.clippings.push(newClipping);
          clippingsAdded++;
        }
      }
    }
  }

  return clippingsAdded;
}

export function countClippingsInCollection(
  booksCollection: BooksCollection,
): number {
  return Object.values(booksCollection).flatMap((book) => book.clippings)
    .length;
}
