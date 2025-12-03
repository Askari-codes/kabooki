'use client'
import React, { useEffect } from 'react'
import * as Separator from "@radix-ui/react-separator";
import { Box,Container, Flex, Heading,Text } from "@radix-ui/themes";
import Image from "next/image";
import { Book, Writer } from "@prisma/client";
import TextWithLinks from "@/app/components/TextWithLinks";

export interface Props {
  writer: Writer;
  book: Book;
}
const BookProfile = ({book,writer}:Props) => {
    useEffect(()=>{
        console.log('cover urls is ',book.cover_url);
    },[])
    
  return (
    <Container>
      <Flex justify="between">
        <Image
          width={400}
          height={400}
          style={{ width: 400, height: 400, objectFit: "cover" }}
          alt={book.title}
          src={
           `/books/${book.cover_url}`
          }
        />
        <Box className="p-5">
          <Flex direction="column">
            <Heading className="">
             {book.title}
            </Heading>
            {/* <TextWithLinks books={books} description={writer.description} /> */}
            <Text>{book.summary}</Text>
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
  )
}

export default BookProfile