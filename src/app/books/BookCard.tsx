import React, { useEffect } from "react";
import {
  AspectRatio,
  Box,
  Flex,
  Text,
  Button,
  Badge,
  Container,
} from "@radix-ui/themes";
import { DividerHorizontalIcon, DownloadIcon } from "@radix-ui/react-icons";
import { Book } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import StarRating from "../components/StarRating";

interface Props {
  book: Book;
  showDownloadButton?: boolean;
}

const BookCard = ({ book, showDownloadButton }: Props) => {
  return (
    <Box className="  bg-green-500">
      <Flex direction="column" width="100%" height={'900px'}>
        <AspectRatio className="h-[70%]" ratio={8 / 12}>
          <Flex className="min-h[300px]" gap="1" direction="column">
            {!book.min_price ? (
              <Badge className="w-[20%] " size={"3"}>
                Free
              </Badge>
            ) : (
              <div className="min-h-[10%]"></div>
            )}
            <Image
              width={300}
              height={200}
              src={`/books/${book.title}.jpg`}
              alt={book.title}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                borderRadius: "var(--radius-2)",
              }}
            />
          </Flex>
        </AspectRatio>
        <Text size={"6"} className="mt-2 h-[25%] bg-red-500" weight="medium">
          <Link className="h-full" href={`/books/${book.id}`}>{book.title} </Link>
        </Text>
        <Box className="h-[5%] bg-blue-500">
          <StarRating rating={book.rating} />
        </Box>
      </Flex>
    </Box>
  );
};

export default BookCard;

{
  /* {showDownloadButton && (
          <Link
            target="_blank"
            className="m-1 "
            href={`${book.pdf_url}`}
            download
          >
            {" "}
            <Button
              className="mb-4"
              size={"2"}
              radius="small"
              variant="solid"
              color="blue"
            >
              <DownloadIcon width="18" height="18" className="cursor-pointer" />
            </Button>
          </Link>
        )} */
}
