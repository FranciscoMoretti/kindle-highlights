"use client";
import { Metadata } from "next";
import Image from "next/image";
import { PlusCircledIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { AlbumArtwork } from "./components/album-artwork";
import { Menu } from "./components/menu";
import { ClippingsEmptyPlaceholder } from "./components/clippings-empty-placeholder";
import { Sidebar } from "./components/sidebar";
import { listenNowAlbums, madeForYouAlbums } from "./data/albums";
import { playlists } from "./data/playlists";
import { BooksCards } from "./components/book-cards";
import { Suspense } from "react";
import { AddClippingsButton } from "./components/add-clippings";
import { useClippingsCollection } from "@/lib/clippings-collection-provider";

export default function MusicPage() {
  const { clippingsCollection } = useClippingsCollection();

  return (
    <>
      <div className="hidden md:block">
        <Menu />
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <Sidebar playlists={playlists} className="hidden lg:block" />
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                  <Tabs defaultValue="books" className="h-full space-y-6">
                    <div className="space-between flex items-center">
                      <TabsList>
                        <TabsTrigger value="books" className="relative">
                          Books
                        </TabsTrigger>
                        <TabsTrigger value="clippings">Clippings</TabsTrigger>
                      </TabsList>
                      <div className="ml-auto mr-4">
                        <AddClippingsButton />
                      </div>
                    </div>
                    <TabsContent
                      value="books"
                      className="border-none p-0 outline-none"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            New Books
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Your most recent books
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      {clippingsCollection &&
                      Object.keys(clippingsCollection).length > 0 ? (
                        <>
                          <div className="relative">
                            <ScrollArea>
                              <Suspense>
                                <BooksCards />
                              </Suspense>
                              <ScrollBar orientation="horizontal" />
                            </ScrollArea>
                          </div>
                          <div className="mt-6 space-y-1">
                            <h2 className="text-2xl font-semibold tracking-tight">
                              Made for you
                            </h2>
                            <p className="text-sm text-muted-foreground">
                              Revisit other books
                            </p>
                          </div>
                          <Separator className="my-4" />
                          <div className="relative">
                            <ScrollArea>
                              <div className="flex space-x-4 pb-4">
                                {madeForYouAlbums.map((album) => (
                                  <AlbumArtwork
                                    key={album.name}
                                    album={album}
                                    slug={""}
                                    className="w-[150px]"
                                    aspectRatio="square"
                                    width={150}
                                    height={150}
                                  />
                                ))}
                              </div>
                              <ScrollBar orientation="horizontal" />
                            </ScrollArea>
                          </div>
                        </>
                      ) : (
                        <ClippingsEmptyPlaceholder />
                      )}
                    </TabsContent>
                    <TabsContent
                      value="clippings"
                      className="h-full flex-col border-none p-0 data-[state=active]:flex"
                    >
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">
                            New Clippings
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Your favorite clippings. Updated daily.
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <ClippingsEmptyPlaceholder />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
