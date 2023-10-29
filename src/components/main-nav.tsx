import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons";
import { buttonVariants } from "./ui/button";

interface MainNavProps {
  className?: string;
}

export function MainNav({ className }: MainNavProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 md:gap-10",
        className,
      )}
    >
      <div className="flex gap-4">
        <Link href="/" className="flex items-center space-x-2">
          {/* <Icons.logo /> */}
          <span className="hidden font-bold md:inline-block">
            Kindle Highlights
          </span>
        </Link>
      </div>
      <div className="flex gap-2">
        {/* <Link
          href={"https://github.com/FranciscoMoretti/kindle-highlights"}
          target="_blank"
          rel="noreferrer"
        >
          <div
            className={cn(
              buttonVariants({
                variant: "ghost",
              }),
              "w-9 px-0",
            )}
          >
            <Icons.gitHub className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </div>
        </Link> */}
      </div>
    </div>
  );
}
