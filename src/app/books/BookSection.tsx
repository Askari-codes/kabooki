import BookCarousel from "./Carousels/BookCarousel";
import { BookWithWriters } from "../../../prisma/types";


interface BookSection{
  books:BookWithWriters[]
}

const BookSection = async ({books}:BookSection) => {
  

  return <BookCarousel books={books} title="Favorit Books" />;
};

export default BookSection;
