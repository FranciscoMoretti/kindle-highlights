// "use server";
import { BookMetadata } from "./types/book-metadata";
import { env } from "@/env.mjs";

const apiUrl = "https://www.googleapis.com/books/v1/volumes";

export function fetchSearchBookMetadata(
  title: string,
  author: string,
): Promise<BookMetadata | undefined> {
  const query = `${title}+inauthor:${author}`;
  const url = `${apiUrl}?q=${query}&key=${env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}`;

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const items = data.items || [];

      if (items.length > 0) {
        const firstBook = items[0].volumeInfo;
        return {
          title: firstBook.title,
          author: firstBook.author,
          description: firstBook.description,
          publishedDate: firstBook.publishedDate,
          image: changeZoomValue(firstBook.imageLinks.thumbnail, 2),
        };
      } else {
        console.error(`Book not found: ${title} author: ${author}`);
        return undefined;
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      return undefined;
    });
}

function changeZoomValue(originalUrl: string, newZoomValue: number) {
  // Check if the URL contains the 'zoom' parameter
  if (originalUrl.includes("zoom=")) {
    // Replace the existing 'zoom' parameter with the new zoom value
    return originalUrl.replace(/zoom=\d+/, `zoom=${newZoomValue}`);
  } else {
    // If 'zoom' parameter doesn't exist, add it to the URL
    const separator = originalUrl.includes("?") ? "&" : "?";
    return `${originalUrl}${separator}zoom=${newZoomValue}`;
  }
}
