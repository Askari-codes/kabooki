import { Container } from "@radix-ui/themes";
//import BookSection from "./books/BookSection";
import WriterSection from "./writers/WriterSection";
import MovieSection from "./movies/MovieSection";
//import PodcastSection from "./podcasts/PodcastSection";

export default function Home() {
  return (
    <Container >
       <WriterSection/>
       {/* <BookSection/> */}
       <MovieSection/>
       {/* <PodcastSection/> */}
     
    </Container>
  );
}
