import { Book } from "@prisma/client";
import BookCarousel from "./BookCarousel";

interface BookSection{
  books:Book[]
}

const BookSection = async ({books}:BookSection) => {
  

  return <BookCarousel books={books} title="Favorit Books" />;
};

export default BookSection;
