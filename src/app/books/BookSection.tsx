import BookCarousel from "./BookCarousel";
import axios from "axios";
import { Book } from "@prisma/client";




const BookSection = async () => {
  const response = await axios.get<Book[]>(`${process.env.BASE_URL}/api/books`);
  const books: Book[] = response.data;

  return <BookCarousel books={books} />;
};

export default BookSection;
