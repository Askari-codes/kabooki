import * as Separator from "@radix-ui/react-separator";
import axios from "axios";
import Image from "next/image";
import { Book } from '@prisma/client'
import { Box, Container, Flex, Heading, Text } from "@radix-ui/themes";
import BookCarousel from "@/app/books/BookCarousel";
import TextWithLinks from "@/app/components/TextWithLinks";
import { useEffect } from "react";
import prisma from "../../../../prisma/client";

import { log } from "console";


interface Props {
  params: { id: string };
}
interface BookLinks{
  [title:string]:string
}

const WriterProfile = async ({ params }: Props) => {
  const id = params.id;

  

  const writerDetails = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/writers/${id}`
  );

  const writerBooksIds = writerDetails.data.books
  let booksIdList =[]
  
    for(const writerbook of writerBooksIds){
      const bookId=writerbook.book_id
      booksIdList.push(bookId)     
    }
    
    const books:Book[] = await Promise.all(
      booksIdList.map(async(id)=>{
    const {data} = await     axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/books/${id}`
        );
        return data
      })
    )
  
    const bestBooks = books.filter((book)=>book.is_the_best)
    const otherBooks = books.filter((book)=>book.is_the_best===false)
    
    
 

  
  
  return (
    <Container>
      
      <Flex justify="between">
        <Image
          width={400}
          height={400}
          style={{ width: 400, height: 400, objectFit: "cover" }}
          alt={writerDetails.data.name + " " + writerDetails.data.last_name}
          src={
            "/writers/" + writerDetails.data.picture_url  ||
            "/writers/" + writerDetails.data.picture_url + "jpeg"
          }
        />
        <Box className="p-5">
          <Flex direction="column">
            <Heading className="">
              {writerDetails.data.name} {writerDetails.data.last_name}
            </Heading>
            <TextWithLinks books={books} description={writerDetails.data.description}/>
            
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
      <BookCarousel title="Selected Books" books={bestBooks} />
      <Separator.Root
        style={{
          margin: "1.5rem 0",
          backgroundColor: "lightgray",
          height: "1px",
        }}
      />
      <BookCarousel title="Other Books" books={otherBooks} />
    </Container>
  );
};

export default WriterProfile;
