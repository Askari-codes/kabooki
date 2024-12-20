import React from "react";
import { BookWithWriter } from "../../../models/models";
import { Swiper, SwiperSlide } from "swiper/react";
import BookCard from "./BookCard";

interface Props {
  books: BookWithWriter[];
}

const chunkArray = (array: BookWithWriter[], size: number) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};
const BookSwiper = ({ books }: Props) => {
  const chunkedWriters = chunkArray(books, 5);
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
              <BookCard key={book.id} book={book} />
            </SwiperSlide>
          ))}
        </Swiper>
      ))}
    </div>
  );
};

export default BookSwiper;
