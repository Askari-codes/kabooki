import { Container } from "@radix-ui/themes";
import BookSection from "./books/BookSection";
import WriterSection from "./writers/WriterSection";
import MovieSection from "./movies/MovieSection";

export default function Home() {
  return (
    <Container >
       <WriterSection/>
       <BookSection/>
       <MovieSection/>
    </Container>
  );
}
