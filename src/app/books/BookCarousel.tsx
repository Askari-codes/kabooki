"use client";
import { Section } from "@radix-ui/themes";
import "swiper/css";
import { BookCarouselProps } from "../../../models/models";
import BookSwiper from "./BookSwiper";

const BookCarousel = ({ books }: BookCarouselProps) => {

  return (
    <Section style={{ padding: "20px 0" }}>
      <h2 style={{ marginBottom: "20px", fontSize: "1.5rem" }}>Books</h2>
      <BookSwiper books={books}/>
    </Section>
  );
};

export default BookCarousel;
