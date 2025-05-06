import { Container } from "@radix-ui/themes";
//import BookSection from "./books/BookSection";
import WriterSection from "./writers/WriterSection";
import MovieSection from "./movies/MovieSection";
//import PodcastSection from "./podcasts/PodcastSection";
import Navbar from "./navigation/Navbar";

export default function Home() {
  return (
    <Container >
      <Navbar/>
       <WriterSection/>
       {/* <BookSection/> */}
       <MovieSection/>
       {/* <PodcastSection/> */}
     
    </Container>
  );
}
