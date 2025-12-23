"use client";
import { Section, Heading } from "@radix-ui/themes";
import "swiper/css";
import BookSwiper from "../BookSwiper";
import { Book, Writer } from "@prisma/client";
import { BookWithWriters } from "../../../../prisma/types";


interface Props {
 books:BookWithWriters[]
 title:string
 hasTooltip?:boolean
}

const BookCarousel = ({
  books,
  title,
  hasTooltip
  

  
}: Props) => {
  return (
    <Section style={{ padding: "20px 0" }}>
      {books.length ? (
        <Heading color="cyan" className="m-3" size={"7"}>
          {title}
        </Heading>
      ) : (
        ""
      )}
      <BookSwiper
        books={books}
        hasTooltip={hasTooltip}
      />
    </Section>
  );
};

export default BookCarousel;
