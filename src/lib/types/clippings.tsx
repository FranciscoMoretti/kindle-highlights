export type Clipping = {
  title: string;
  text: string;
  timestamp: string;
  fullText: string;
};
export type ClippingsCollection = Record<string, Clipping[]>;
