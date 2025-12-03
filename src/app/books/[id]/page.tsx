import Image from "next/image";
import { Box, Card, Heading, Text, Separator, Container } from "@radix-ui/themes";
// import { BookWithWriter } from "../../../../models/models";
import axios from "axios";
import { notFound } from "next/navigation";
import BookProfile from "./BookProfile";

const BookPage = async ({ params }: { params: { id: string } }) => {
  const bookId = Number(params.id)
 const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/books/${bookId}`
  )
  const {data:book} =response
  
  const writerResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/bookWriters/${bookId}`
  )
  const {data:writer} =writerResponse
  
  
  
  
  
  
  return (
   
    <Container>
      <BookProfile writer={writer} book={book}/>
    </Container>
  );
};

export default BookPage;
