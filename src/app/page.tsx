import WriterSection from "./writers/WriterSection";
import BookSection from "./books/BookSection";
import GenresSection from "./genres/GenresSection";

export default function Home() {
  return (
    <main >
    
      <WriterSection/>
      <BookSection/>
      <GenresSection/>
    </main>
  );
}
