import { Container } from "@radix-ui/themes";
import WriterSection from "./writers/WriterSection";
import MovieSection from "./movies/MovieSection";
import { Book, Movie, Writer } from "@prisma/client";
import NavbarWrapper from "./navigation/NavbarWrapper";
import BookSection from "./books/BookSection";

export default async function Home() {
  const rwitersResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/writers/`,
    {
      cache: "no-cache",
    }
  );
  const writers: Writer[] = await rwitersResponse.json();

  const moviesResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies`,
  {
    cache:"no-cache"
  }
)
  const movies:Movie[] =await moviesResponse.json()
  
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
      <MovieSection movies={movies} />
      {/* <BookSection books={books}/> */}
    </Container>
  );
}
