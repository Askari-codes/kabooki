import Image from "next/image";
import { Box, Card, Heading, Text, Separator, Container } from "@radix-ui/themes";
// import { BookWithWriter } from "../../../../models/models";
import axios from "axios";
import { notFound } from "next/navigation";
import BookProfile from "./BookProfile";
import BestBooks from "./BestBooks";
import { Book, BooksWriters, Writer,Movie } from "@prisma/client";
import { log } from "console";
import MovieCarousel from "@/app/movies/MovieCarousel";

const BookPage = async ({ params }: { params: { id: string } }) => {
  const bookId = Number(params.id)
 const bookResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/books/${bookId}`
  )
  const {data:book} =bookResponse
  
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
  const bestBoks = otherBooks.filter((b)=>b.is_the_best)
  
 const filmResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/bookMovies/${bookId}`
  )
  const movies:Movie[]=filmResponse.data
  console.log('film respone is ',filmResponse)
 
  
  
  return (
   
    <Container>
      <BookProfile writer={writer} book={book}/>
      <BestBooks books={bestBoks} writer={writer}/>
      {movies.length!==0&&<MovieCarousel movies={movies} title="Related movies"/>}
     
    </Container>
  );
};

export default BookPage;
