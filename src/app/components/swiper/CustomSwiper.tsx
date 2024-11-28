'use client';
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperContent from "../SwiperContent";
import { CustomSwiperProps } from "../../../../models/models";

const CustomSwiper = ({ books, writers }: CustomSwiperProps) => {
  
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={4}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1280: { slidesPerView: 4 },
      }}
    >
      {/* Conditionally render based on props */}
      {books &&
        books.map((book) => (
          <SwiperSlide key={book.id}>
            <SwiperContent book={book}  />
          </SwiperSlide>
        ))}

      {writers &&
        writers.map((writer) => (
          <SwiperSlide key={writer.id}>
            <SwiperContent writer={writer} />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default CustomSwiper;
