import { Container } from "@radix-ui/themes";
import WriterSection from "./writers/WriterSection";
import MovieSection from "./movies/MovieSection";
import { Book, Movie, Writer } from "@prisma/client";
import NavbarWrapper from "./navigation/NavbarWrapper";
import BookSection from "./books/BookSection";
import { safeFetchJson } from "./utilities/services";

export default async function Home() {
  const writers = await safeFetchJson<Writer>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/writers/`);
  const movies = await safeFetchJson<Movie>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies`);

  // const booksResponse = await fetch(
  //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/books`,
  //   {
  //     cache: "no-cache",
  //   }
  // );
  // const books:Book[] = await booksResponse.json();
  
  return (
    <Container>
      <NavbarWrapper />
      <WriterSection writers={writers} />
      {/* <MovieSection movies={movies} /> */}
      {/* <BookSection books={books}/> */}
    </Container>
  );
}
