import { BellRing, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { generateFilename, generateMarkdown } from "@/lib/clippings-utils";
import { Clipping } from "@/lib/types/clippings";

import { MdExporter } from "./md-exporter";
import Link from "next/link";

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
];

type CardProps = React.ComponentProps<typeof Card> & {
  slug: string;
  clippings: Clipping[];
};

export function BookCard({ className, slug, clippings }: CardProps) {
  return (
    <Card className={cn("w-[380px]", className)}>
      <CardHeader>
        <CardTitle>{clippings[0]?.title}</CardTitle>
        <CardDescription>{`${clippings.length} highlights`}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {/* <div className=" flex items-center space-x-4 rounded-md border p-4">
          <BellRing />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Push Notifications
            </p>
            <p className="text-sm text-muted-foreground">
              Send notifications to device.
            </p>
          </div>
        </div>
        <div>
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {notification.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </div> */}
      </CardContent>
      <CardFooter>
        <div className="flex w-full flex-col items-center justify-center gap-2 ">
          <Link href={"/book/" + slug}>
            <Button className="w-full">
              {/* <Check className="mr-2 h-4 w-4" />  */}
              See highlights
            </Button>
          </Link>
          <MdExporter
            filename={`${generateFilename(slug)}.md`}
            content={generateMarkdown(slug, clippings)}
          >
            <Button className="w-full">
              {/* <Check className="mr-2 h-4 w-4" />  */}
              Download Markdown
            </Button>
          </MdExporter>
        </div>
      </CardFooter>
    </Card>
  );
}
