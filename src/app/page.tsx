import GenresSection from "./genres/GenresSection";
import BookSection from "./books/BookSection";
import WriterSection from "./writers/WriterSection";

export default function Home() {
  return (
    <main >
      <WriterSection/>
      <BookSection/>
      <GenresSection/>
    </main>
  );
}
