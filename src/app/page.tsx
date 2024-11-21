import { Button } from "@radix-ui/themes";
import WriterSection from "./writers/WriterSection";
import BookSection from "./books/BookSection";
import GenresSection from "./genres/GenresSection";

export default function Home() {
  return (
    <main >
      <h1>
      hello wold
      </h1>
      <WriterSection/>
      <BookSection/>
      <GenresSection/>
    </main>
  );
}
