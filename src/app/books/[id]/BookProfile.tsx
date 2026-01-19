"use client";
import React, { useEffect } from "react";
import Seprator from "@/app/components/Seprator";
import { Box, Button, Container, Flex, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import { Book, Writer } from "@prisma/client";
import TextWithLinks from "@/app/components/TextWithLinks";
import Link from "next/link";
import { BookWithWriters } from "../../../../prisma/types";

export interface Props {
  bookWithWriters:BookWithWriters
}
const BookProfile = ({ bookWithWriters }: Props) => {
  
const books:Book[]= bookWithWriters.writer!.books.filter((b)=>b.id!==bookWithWriters.id)
const writer:Writer = bookWithWriters.writer!  
const writers:Writer[] = [writer]





  return (
    <Container>
      <Flex justify={'center'} align={'center'} width={'100%'} >
        <Box width={'25%'} >
       <Flex gap={'2'} direction={'column'} >
       <Image
          width={400}
          height={400}
          style={{ width: 400, height: 400, objectFit: "cover" }}
          alt={bookWithWriters.title}
          src={`/books/${bookWithWriters.writer!.slug}/${bookWithWriters.cover_url}`}
        />
        {!bookWithWriters.min_price?<Button  variant="solid"><Link className="cursor-pointer text-white"  href={`${bookWithWriters.pdf_url}`}> Download</Link></Button>:null}
       </Flex>
        </Box>
        <Box width={'75%'} className="p-5">
          <Flex direction="column">
            <Heading className="">{bookWithWriters.title}</Heading>
            {/* <Text className="text-justify">{bookWithWriters.summary}</Text> */}
            <TextWithLinks books={books} description={bookWithWriters.summary} writers={writers}  />
          </Flex>
        </Box>
      </Flex>
      <Seprator />
      
    </Container>
  );
};

export default BookProfile;
