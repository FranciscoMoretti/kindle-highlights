import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { headers } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";
import { ClippingsCollectionProvider } from "@/lib/clippings-collection-provider";
import { MainNav } from "@/components/main-nav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} container`}>
        <TRPCReactProvider headers={headers()}>
          <ClippingsCollectionProvider>
            <MainNav />
            {children}
          </ClippingsCollectionProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
