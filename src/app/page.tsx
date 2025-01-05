import { Container } from "@radix-ui/themes";
import BookSection from "./books/BookSection";
import WriterSection from "./writers/WriterSection";

export default function Home() {
  return (
    <Container >
       <WriterSection/>
       <BookSection/>
    </Container>
  );
}
