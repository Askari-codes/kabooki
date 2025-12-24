import React, { useEffect } from "react";
import { AspectRatio, Flex, Text, Badge } from "@radix-ui/themes";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Book, Writer, BooksWriters } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import StarRating from "../components/StarRating";
import { BookWithWriters } from "../../../prisma/types";

interface Props {
  book: BookWithWriters|Book;
  hasTooltip?: boolean;
  writerSlug?: string;
}

const BookCard = ({ book, hasTooltip,writerSlug }: Props) => {
 function hasWriters(book: any): book is BookWithWriters {
  return (book as BookWithWriters).writers !== undefined;
}
let folderName = "default"; 
  
  if (hasWriters(book)) {
    folderName = book.writers[0]?.writer.slug;
  } else if (writerSlug) {
    folderName = writerSlug;
  }

  return (
    <Flex direction={"column"} justify={"between"} height={"510px"}>
      <AspectRatio className="h-[400px] " ratio={8 / 12}>
        <Flex gap="1" direction="column">
          {!book.min_price ? (
            <Badge className=" " size={"3"}>
              <Flex className="w-[100%] " justify={"between"}>
                <Text className="">Free</Text>
                <div className="">
                  <StarRating rating={book.rating} />
                </div>
              </Flex>
            </Badge>
          ) : (
            <Badge className=" " size={"3"}>
              <Flex className="w-[100%] " justify={"center"}>
                <Text className=""></Text>
                <div className="">
                  <StarRating rating={book.rating} />
                </div>
              </Flex>
            </Badge>
          )}
          {hasTooltip ? (
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <Image
                    width={300}
                    height={200}
                    src={`/books/${folderName}/${book.cover_url}`}
                    alt={book.title}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                      borderRadius: "var(--radius-2)",
                    }}
                  />
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    sideOffset={-35}
                    className="z-50 select-none rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white shadow-md animate-in fade-in zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                    align="center"
                    side="top"
                  >
                    {/* <Link href={`/writers/${book.writers[0].writer.id}`}>
                      {" "}
                      {`Written by ${book.writers[0].writer.name} ${book.writers[0].writer.last_name}`}
                    </Link> */}
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          ) : (
            <Image
              width={300}
              height={200}
              src={`/books/${folderName}/${book.cover_url}`}
              alt={book.title}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                borderRadius: "var(--radius-2)",
              }}
            />
          )}
        </Flex>
      </AspectRatio>

      <div className="h-[100px] flex justify-center items-baseline text-[1.5rem]">
        <Link
          className=" font-serif font-semibold  "
          href={`/books/${book.id}`}
        >
          {book.title}{" "}
        </Link>
      </div>
    </Flex>
  );
};

export default BookCard;
