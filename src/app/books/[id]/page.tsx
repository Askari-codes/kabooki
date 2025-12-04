import Image from "next/image";
import { Box, Card, Heading, Text, Separator, Container } from "@radix-ui/themes";
// import { BookWithWriter } from "../../../../models/models";
import axios from "axios";
import { notFound } from "next/navigation";
import BookProfile from "./BookProfile";
import OtherBooks from "./OtherBooks";
import { Book, BooksWriters, Writer } from "@prisma/client";

const BookPage = async ({ params }: { params: { id: string } }) => {
  const bookId = Number(params.id)
 const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/books/${bookId}`
  )
  const {data:book} =response
  
  const writerResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/bookWriters/${bookId}`
  )
  const writer:Writer =writerResponse.data
 
  

  const {data}= await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/writers/${writer.id}`
  ) 
  const booksWriterInfo:BooksWriters[] =data.books
  const booksInfo = booksWriterInfo.map((item)=>(
    item.book_id
  ))
  const writerOtherBooksIds = booksInfo.filter((id)=>(
    id!==bookId
  ))
  
  const otherBooks:Book[] = await Promise.all(
    writerOtherBooksIds.map(async(id:number)=>{
      const {data} = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/books/${id}`
      );
      return data
    })
    
  )
  
  
  
  
  
  

  
  
  
 
  
  
  
  
  
  
  
  return (
   
    <Container>
      <BookProfile writer={writer} book={book}/>
      <OtherBooks/>
    </Container>
  );
};

export default BookPage;
