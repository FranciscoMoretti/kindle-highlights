export type Clipping = {
  title: string;
  author: string;
  text: string;
  timestamp: string;
  fullText: string;
};
export type ClippingsCollection = Record<string, Clipping[]>;
