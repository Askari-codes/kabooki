import BookCarousel from "./BookCarousel";
import {BookWithWriter} from '../../../models/models'

const BookSection = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books`);
  const books: BookWithWriter[] = await response.json();

  return <BookCarousel books={books} />;
};

export default BookSection;
