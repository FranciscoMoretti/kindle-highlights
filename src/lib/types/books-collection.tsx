import { BookMetadata } from "./book-metadata";
import { Clipping } from "./clippings";

export type Book = {
  clippings: Clipping[];
  metadata?: BookMetadata;
};

export type BooksCollection = Record<string, Book>;
