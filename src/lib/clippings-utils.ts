// const dropArea = document.getElementById("drop-area") as HTMLDivElement;
// const bookEmojis: string[] = ["📕", "📙", "📒", "📗", "📘", "📓", "📔"];

import { Clipping, ClippingsCollection } from "@/lib/types/clippings";
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

function parseClippings(contents: string): Clipping[] {
  const timestampRegex = /Added on|Добавлено|Añadido el:.*/;

  const clippings = contents.split(SEPARATOR);

  return clippings
    .map((clipping) => {
      const attributes = clipping.split("\n");

      // Filter out unnecessary attributes
      const cleanedUpAttributes = attributes.filter(
        (attr) => attr !== "\r" && attr !== "",
      );

      // Skip current clipping if it doesn't contain at least 3 attributes
      if (cleanedUpAttributes.length < 3) {
        return null;
      }

      const [title, timestamp, text] = cleanedUpAttributes.map(
        (attr, index) => {
          if (index === 1) {
            return getAttribute(attr, timestampRegex);
          }
          return getAttribute(attr);
        },
      );

      return { title, text, timestamp, fullText: clipping };
    })
    .filter((value): value is Clipping => value !== null);
}

function getAttribute(attribute: string, regex?: RegExp): string {
  const cleanedAttribute = attribute.trim();
  return regex
    ? cleanedAttribute.split(regex).filter(Boolean)[1]
    : cleanedAttribute;
}

export function readFile(file: File): Promise<ClippingsCollection> {
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

        // const booksTitles = Object.keys(groupedClippings);
        console.log("Done!");
        resolve(
          new Map(
            Object.entries(groupedClippings).map(([string, clippings]) => [
              slugify(string),
              clippings,
            ]),
          ),
        );
      } catch (error) {
        console.error(error); // this will log the error message to the console
        reject(error);
      }
    };
    reader.readAsText(file);
  });
}

function renderBook(
  books: Record<string, { title: string; text: string; timestamp: string }[]>,
  title: string,
  amountOfClippings: number,
  bookIndex: number,
) {
  // create a new div element
  const newDiv = document.createElement("div");
  const anchor = document.createElement("a");
  anchor.id = `book-${bookIndex}`;
  // and give it some content
  const paragraph = document.createElement("p");
  const newContent = document.createTextNode(
    `${bookEmojis[bookIndex]} ${title}: ${amountOfClippings}`,
  );
  // add the text node to the newly created div
  paragraph.appendChild(newContent);
  anchor.appendChild(paragraph);
  newDiv.appendChild(anchor);
  newDiv.classList.add("book");
  // add the newly created element and its content into the DOM
  const booksList = document.getElementById("books-list");
  const firstChild = booksList?.firstChild;

  if (booksList) {
    const contents = generateMarkdown(title, clippings);
    const filename = title
      .replace(/\"/gi, "'")
      .replace(/[\\\/"\*\:\?<>|]/gi, "");
    download(anchor, `${filename}.md`, contents);
    booksList.insertBefore(newDiv, firstChild);
  }
}

function generateDownload(title, clippings) {
  const contents = generateMarkdown(title, clippings);
  const filename = generateFilename(title);
  download(anchor, `${filename}.md`, contents);
}

export function generateFilename(title: any) {
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

const groupBy = (key: string) => (array: { [key: string]: any }[]) =>
  array.reduce(
    (objectsByKeyValue, obj) => {
      const value = obj[key];
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      return objectsByKeyValue;
    },
    {} as { [key: string]: any },
  );
