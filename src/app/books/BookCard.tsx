import React, { useEffect } from "react";
import { AspectRatio, Box, Flex, Text, Button } from "@radix-ui/themes";
import { DownloadIcon } from "@radix-ui/react-icons";
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
    <Box className="flex justify-center items-center">
      <Flex direction="column" width="100%">
        {showDownloadButton && (
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
        )}
        <AspectRatio ratio={8 / 12}>
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
        </AspectRatio>
        <Text size={"6"} className="mt-2" weight="medium">
          <Link href={`/books/${book.id}`}>{book.title} </Link>
        </Text>
        <Box>
          <StarRating rating={book.rating} />
        </Box>
      </Flex>
    </Box>
  );
};

export default BookCard;
