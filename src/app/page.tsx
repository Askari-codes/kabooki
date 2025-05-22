import { Container } from "@radix-ui/themes";
//import BookSection from "./books/BookSection";
import WriterSection from "./writers/WriterSection";
import MovieSection from "./movies/MovieSection";
//import PodcastSection from "./podcasts/PodcastSection";
// import Navbar from "./navigation/Navbar";
import { Writer } from "@prisma/client";
import NavbarWrapper from "./navigation/NavbarWrapper";
import SearchResultWrapper from "./searchResult/page";

export default async function Home() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/writers/`,
    {
      cache: "no-cache",
    }
  );
  const writers: Writer[] = await response.json();
  return (
    <Container>
      <NavbarWrapper />
      <WriterSection writers={writers} />
      {/* <BookSection/> */}
      <MovieSection />
      {/* <PodcastSection/> */}
      <SearchResultWrapper />
    </Container>
  );
}
