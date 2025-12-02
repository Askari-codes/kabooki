"use client";
import { Section } from "@radix-ui/themes";
import "swiper/css";
import BookSwiper from "./BookSwiper";
import { Book } from "@prisma/client";

interface Props{
  title:string
  books:Book[]
  showDownloadButton?:boolean
}

const BookCarousel = ({ books,title,showDownloadButton=false}:Props) => {

  return (
    <Section style={{ padding: "20px 0" }}>
   {books.length?   <h2 style={{ marginBottom: "20px", fontSize: "1.5rem", fontWeight:'bold' }}>{title}</h2>:''}
      <BookSwiper showDownloadButton={showDownloadButton} books={books}/>
    </Section>
  );
};

export default BookCarousel;
