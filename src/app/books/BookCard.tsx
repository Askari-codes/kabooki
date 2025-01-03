import React from "react";
import { AspectRatio, Box, Flex, Text, } from "@radix-ui/themes";
import { BookWithWriter } from "../../../models/models";
import Image from "next/image";
import Link from "next/link";
import StarRating from "../components/StarRating";
import { Label } from "@radix-ui/themes/dist/cjs/components/context-menu";
import { UserFavoriteBook } from "@prisma/client";

interface Props {
  book: BookWithWriter
}

const BookCard = ({ book }: Props) => {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Flex direction={"column"} width={"100%"}>
        <AspectRatio ratio={8 / 12}>
          <Image
            width={300}
            height={200}
            src={
              `/books/${book.cover_url}.jpg` || `/books/${book.cover_url}.jpeg`
            }
            alt={book.title}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              borderRadius: "var(--radius-2)",
            }}
          />
        </AspectRatio>
        <Text size={"6"}  className="mt-2" weight="medium">
          <Link href={`books/${book.slug}`}>{book.title}</Link>
        </Text>
        <Box>
          <StarRating rating={book.rating} />
        </Box>
        <Text weight='medium' >
          {book.min_price===0.00?'Free':`from $${book.min_price}`}
        </Text>
      </Flex>
    </Box>
  );
};

export default BookCard;
