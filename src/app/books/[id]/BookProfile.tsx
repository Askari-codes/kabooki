"use client";
import React, { useEffect } from "react";
import Seprator from "@/app/components/Seprator";
import { Box, Button, Container, Flex, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import { Book, Writer } from "@prisma/client";
import TextWithLinks from "@/app/components/TextWithLinks";
import Link from "next/link";

export interface Props {
  writer: Writer;
  book: Book;
}
const BookProfile = ({ book, writer }: Props) => {
  
  useEffect(()=>{
    console.log(`/books/${writer.slug}${book.cover_url}`);
  },[])
  

  return (
    <Container>
      <Flex justify={'center'} align={'center'} width={'100%'} >
        <Box width={'25%'} >
       <Flex gap={'2'} direction={'column'} >
       <Image
          width={400}
          height={400}
          style={{ width: 400, height: 400, objectFit: "cover" }}
          alt={book.title}
          src={`/books/${writer.slug}/${book.cover_url}`}
        />
        <Button  variant="solid"><Link className="cursor-pointer text-white"  href={`${book.pdf_url}`}> Download</Link></Button>
       </Flex>
        </Box>
        <Box width={'75%'} className="p-5">
          <Flex direction="column">
            <Heading className="">{book.title}</Heading>
            <Text className="text-justify">{book.summary}</Text>
          </Flex>
        </Box>
      </Flex>
      <Seprator />
      
    </Container>
  );
};

export default BookProfile;
