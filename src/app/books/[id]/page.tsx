import {  Container,} from "@radix-ui/themes";
import {  BooksWriters, Writer, Movie, Book,  } from "@prisma/client";
import { RelatedBookExtended } from "../../../../prisma/types";
import { BookWithWriters} from "../../../../prisma/types";
import axios from "axios";
import BookProfile from "./BookProfile";
import BestBooks from "./BestBooks";
import MovieCarousel from "@/app/movies/MovieCarousel";
import RelatedBooks from "./RelatedBooks";

const BookPage = async ({ params }: { params: { id: string } }) => {
  const bookId = Number(params.id);
  const bookResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/books/${bookId}`
  );
 const bookWithWriters:BookWithWriters=bookResponse.data
 
 
 const relatedBooks:RelatedBookExtended[] = bookWithWriters.relatedFrom.map((book)=>(book))
 const movies = bookWithWriters.bookMovies

 console.log(bookWithWriters);
 
 

  return (
    <Container>
      <BookProfile bookWithWriters={bookWithWriters} />
      <BestBooks bookWithWriters={bookWithWriters} mainBookId={bookId} />
      {relatedBooks.length !== 0 && (
        <RelatedBooks writerSlug="" relatedBooks={relatedBooks} sourceBook={bookWithWriters} />
      )}
      {movies.length !== 0 && (
        <MovieCarousel movies={movies} title="Related movies" />
      )}
    </Container>
  );
};

export default BookPage;
