'use client'
import React from "react";
import * as Separator from "@radix-ui/react-separator";
import { Box, Container, Flex, Heading } from "@radix-ui/themes";
import Image from "next/image";
import { Book, Writer } from "@prisma/client";
import TextWithLinks from "@/app/components/TextWithLinks";
import { WriterWithBooks } from "../../../../prisma/types";

export interface Props {
 writerWithBooks:WriterWithBooks
 relatedWriters:Writer[]
}


const WriterProfile = ({writerWithBooks,relatedWriters }: Props) => {
  
  
  return (
    <Container>
      <Flex align={"start"} justify="between">
        <Container height={"500px"}>
          <Container>
            {writerWithBooks.nobelist && (
              <Flex
                width={"100%"}
                height={"80px"}
                justify={"end"}
                align={"center"}
              >
                <Image
                  width={60}
                  height={60}
                  alt="nobel-prize"
                  src={"/medals/nobel_medal.svg"}
                />
              </Flex>
            )}
            <Image
              width={400}
              height={400}
              style={{
                width: 400,
                height: 400,
                objectFit: "cover",
                borderRadius: "100%",
                border: "1px solid yellow",
              }}
              alt={writerWithBooks.name + " " + writerWithBooks.last_name}
              src={
                "/writers/" + writerWithBooks.picture_url ||
                "/writers/" + writerWithBooks.picture_url + "jpeg"
              }
            />
          </Container>
        </Container>

        <Box className="p-5">
          <Flex direction="column">
            <Heading className="">
              {writerWithBooks.name} {writerWithBooks.last_name}
            </Heading>
            <TextWithLinks writers={relatedWriters} books={writerWithBooks.books} description={writerWithBooks.description} />
          </Flex>
        </Box>
      </Flex>
      <Separator.Root
        style={{
          margin: "1.5rem 0",
          backgroundColor: "lightgray",
          height: "1px",
        }}
      />
    </Container>
  );
};

export default WriterProfile;
