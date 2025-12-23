import {  Container,} from "@radix-ui/themes";
import {  BooksWriters, Writer, Movie } from "@prisma/client";
import { BookWithWriters } from "../../../../prisma/types";
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
  const { data: book } = bookResponse;

  const writerResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/bookWriters/${bookId}`
  );
  const writer: Writer = writerResponse.data.writer;

  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/writers/${writer.id}`
  );
  const booksWriterInfo: BooksWriters[] = data.books;
  const booksInfo = booksWriterInfo.map((item) => item.book_id);
  const writerOtherBooksIds = booksInfo.filter((id) => id !== bookId);

  const otherBooks: BookWithWriters[] = await Promise.all(
    writerOtherBooksIds.map(async (id: number) => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/books/${id}`
      );
      return data;
    })
  );
  const bestBoks = otherBooks.filter((b) => b.is_the_best);

  const filmResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/bookMovies/${bookId}`
  );
  const movies: Movie[] = filmResponse.data;

  const relatedBooksResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/relatedBooks/${bookId}`
  );
  const relatedBooks: BookWithWriters[] = relatedBooksResponse.data;
  const relatedBooksIds = relatedBooks.map((book) => book.id);

  const booksWriters: BookWithWriters[] = await Promise.all(
    relatedBooksIds.map(async (id: number) => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/books/${id}`
      );
      return data;
    })
  );

  return (
    <Container>
      <BookProfile writer={writer} book={book} />
      <BestBooks books={bestBoks} writer={writer} />
      {relatedBooks.length !== 0 && (
        <RelatedBooks books={booksWriters} sourceBook={book} />
      )}
      {movies.length !== 0 && (
        <MovieCarousel movies={movies} title="Related movies" />
      )}
    </Container>
  );
};

export default BookPage;
