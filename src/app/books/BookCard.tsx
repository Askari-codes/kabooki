import React from "react";
import { AspectRatio, Box, Flex,Text } from "@radix-ui/themes";
import { BookWithWriter } from "../../../models/models";
import Image from "next/image";

interface Props {
    book:BookWithWriter
}

const BookCard = ({book}:Props) => {
    return (
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
         <Flex
         direction={'column'}
         width={'100%'}
         >
         <AspectRatio ratio={8 / 12}>
            <Image
            width={300}
            height={200}
              src={
                `/books/${book.cover_url}.jpg` ||
                `/books/${book.cover_url}.jpeg`
              }
              alt="A house in a forest"
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                borderRadius: "var(--radius-2)",
              }}
            />
          </AspectRatio>
          <Text size={'6'} align={'center'} className="mt-2" weight='medium' >
            {book.title}
          </Text>
         </Flex>
        </Box>
      );
}

export default BookCard
