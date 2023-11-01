import { type BookMetadata } from "./book-metadata";
import { type Clipping } from "./clippings";

export type Book = {
  clippings: Clipping[];
  metadata?: BookMetadata;
};

export type BooksCollection = Record<string, Book>;
