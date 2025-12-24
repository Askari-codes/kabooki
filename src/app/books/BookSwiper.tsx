
import React from "react";
import { Book, Writer } from '@prisma/client';
import { Swiper, SwiperSlide } from "swiper/react";
import BookCard from "./BookCard";
import { writer } from "repl";
import { BookWithWriters } from "../../../prisma/types";


interface Props {
 books:BookWithWriters[]|Book[]
 hasTooltip?:boolean
 writerSlug?:string
  
}

const chunkArray = (array: BookWithWriters[]|Book[], size: number) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};
const BookSwiper = ({ books,hasTooltip,writerSlug }: Props) => {
  const chunkedWriters = chunkArray(books, 10);
  
  
  return (
    <div>
      {chunkedWriters.map((books, index) => (
        <Swiper
          className=""
          key={index}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {books.map((book) => (
            <SwiperSlide className="p-5 " key={book.id}>
              <BookCard book={book} key={book.id} hasTooltip={hasTooltip} writerSlug={writerSlug}  />
            </SwiperSlide>
          ))}
        </Swiper>
      ))}
    </div>
  );
};

export default BookSwiper;
