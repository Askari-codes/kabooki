'use client'
import React,{useState,useEffect} from 'react'
import * as Separator from "@radix-ui/react-separator";
import { Book } from '@prisma/client'
import { Box, Button, Container, Flex, Heading, Text } from "@radix-ui/themes";
import BookCarousel from "@/app/books/BookCarousel";
import WriterProfile from "./WriterProfile";

export interface Props{
    books:Book[]
}

const WriterBooks = ({books}:Props) => {
    const [showMoreBooks,setShowMoreBooks] = useState<Boolean>(false)

    const bestBooks = books.filter((book)=>book.is_the_best)
    const otherBooks = books.filter((book)=>book.is_the_best===false)
    const firstPart:Book[] = otherBooks.slice(0,10);
    const remainPart = otherBooks.slice(10)
    
    console.log(bestBooks);
    
    

    const displayBooksHandler = ()=>{
        setShowMoreBooks(!showMoreBooks)
    }
   
    

  return (
    <Container>
         <BookCarousel title="Selected Books" books={bestBooks} />
      <Separator.Root
        style={{
          margin: "1.5rem 0",
          backgroundColor: "lightgray",
          height: "1px",
        }}
      />
      <BookCarousel title="Other Books" books={firstPart} />
      {showMoreBooks&&<BookCarousel title='' books={remainPart}/>}
      <Button onClick={displayBooksHandler}>{showMoreBooks?'Fewer Books':'All Books'}</Button>
    </Container>
  )
}

export default WriterBooks