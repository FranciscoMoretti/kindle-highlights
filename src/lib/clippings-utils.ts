// const dropArea = document.getElementById("drop-area") as HTMLDivElement;
// const bookEmojis: string[] = ["📕", "📙", "📒", "📗", "📘", "📓", "📔"];

import { type Clipping } from "@/lib/types/clippings";
import { type BooksCollection } from "@/lib/types/books-collection";
import { slugify } from "transliteration";

function download(
  element: HTMLAnchorElement,
  filename: string,
  contents: string,
) {
  element.setAttribute(
    "href",
    "data:text/markdown;charset=utf-8," + encodeURIComponent(contents),
  );
  element.setAttribute("download", filename);
  element.classList.add("book-url");
}

function validateType(fileList: FileList): boolean {
  for (const file of Array.from(fileList)) {
    const type = file.type;
    if (type != "text/plain") {
      alert("Only .txt files are supported");
      return false;
    } else {
      return true;
    }
  }
  return true;
}

// Utility functions
const cleanUp = (str: string) => str.replace(/[\n\r]+/g, "");
const SEPARATOR = "==========";

function extractTitleAndAuthor(line: string): {
  title: string;
  author: string;
} {
  const authorRegex = /\(([^()]+)\)$/; // Matches the last set of parentheses
  const match = line.match(authorRegex);

  if (match) {
    const author = match[0].substring(1, match[0].length - 1); // Remove parentheses from start and end
    const title = line.replace(authorRegex, "").trim();

    return { title, author };
  } else {
    // If no author information is found, assume the whole line is the title.
    return { title: line, author: "" };
  }
}

function parseClippings(contents: string): Clipping[] {
  const timestampRegex = /Added on|Добавлено|Añadido el:.*/;

  const clippings = contents.split(SEPARATOR);

  return clippings
    .map((clipping) => {
      const attributes = clipping.split("\n").map((line) => line.trim());

      // Filter out unnecessary attributes
      const cleanedUpAttributes = attributes.filter(
        (attr) => attr !== "\r" && attr !== "",
      );

      // Skip current clipping if it doesn't contain at least 3 attributes
      if (cleanedUpAttributes == undefined || cleanedUpAttributes.length < 3) {
        return null;
      }

      const { title, author } = extractTitleAndAuthor(cleanedUpAttributes[0]!);

      const timestamp = getAttribute(cleanedUpAttributes[1]!, timestampRegex);
      const text = getAttribute(cleanedUpAttributes[2]!);

      return { title, author, text, timestamp, fullText: clipping };
    })
    .filter((value): value is Clipping => value !== null);
}

function getAttribute(attribute: string, regex?: RegExp): string {
  const cleanedAttribute = attribute.trim();
  const value = regex
    ? cleanedAttribute.split(regex).filter(Boolean)[1]
    : cleanedAttribute;
  return value ?? "";
}

export function readFile(file: File): Promise<BooksCollection> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      try {
        console.log("Reading the file");
        const contents = event.target?.result as string;

        console.log("Parsing clippings");
        const parsed = parseClippings(contents);

        console.log("Grouping clippings by titles");
        const groupByTitles = groupBy("title");
        const groupedClippings = groupByTitles(parsed);
        const clippingsCollection = Object.fromEntries(
          Object.entries(groupedClippings).map(([title, clippings]) => [
            slugify(title),
            { clippings },
          ]),
        );
        // const booksTitles = Object.keys(groupedClippings);
        console.log("Done!");
        resolve(clippingsCollection);
      } catch (error) {
        console.error(error); // this will log the error message to the console
        reject(error);
      }
    };
    reader.readAsText(file);
  });
}

export function generateFilename(title: string) {
  return title.replace(/\"/gi, "'").replace(/[\\\/"\*\:\?<>|]/gi, "");
}

export function generateMarkdown(title: string, clippings: Clipping[]): string {
  return clippings.map((clipping) => clipping.fullText).join(SEPARATOR);
  // TODO: Implement the inverse conversion to preserve the original format
  // let str = "";
  // for (const clipping of clippings) {
  //   str += `> ${clipping["text"]}\n\n${clipping["timestamp"]}\n\n`;
  // }
  // return str;
}

const groupBy = (key: "title" | "author") => (array: Clipping[]) =>
  array.reduce(
    (objectsByKeyValue, obj) => {
      const value = obj[key];
      objectsByKeyValue[value] = (objectsByKeyValue[value] ?? []).concat(obj);
      return objectsByKeyValue;
    },
    {} as Record<string, Clipping[]>,
  );
