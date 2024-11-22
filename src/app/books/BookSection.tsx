import BookCarousel from "./BookCarousel";
import axios from "axios";
import {BookWithWriter} from '../../../models/models'




const BookSection = async () => {
  const response = await axios.get<BookWithWriter[]>(`${process.env.BASE_URL}/api/books`);
  
  const books: BookWithWriter[] = response.data;
  console.log(books);
  

  return <BookCarousel books={books} />;
};

export default BookSection;
