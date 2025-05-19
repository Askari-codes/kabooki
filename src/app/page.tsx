import { Container } from "@radix-ui/themes";
//import BookSection from "./books/BookSection";
import WriterSection from "./writers/WriterSection";
import MovieSection from "./movies/MovieSection";
//import PodcastSection from "./podcasts/PodcastSection";
import NavbarWrapper from "./navigation/NavbarWrapper";

export default function Home() {
  return (
    <Container >
      <NavbarWrapper/>
       <WriterSection/>
       {/* <BookSection/> */}
       <MovieSection/>
       {/* <PodcastSection/> */}
     
    </Container>
  );
}
