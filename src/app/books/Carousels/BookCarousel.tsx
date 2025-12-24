"use client";
import { Section, Heading } from "@radix-ui/themes";
import "swiper/css";
import BookSwiper from "../BookSwiper";
import { Book, Writer } from "@prisma/client";
import { BookWithWriters } from "../../../../prisma/types";


interface Props {
 books:BookWithWriters[]|Book[]
 title:string
 hasTooltip?:boolean
 writerSlug?: string;
}

const BookCarousel = ({
  books,
  title,
  hasTooltip,
  writerSlug
  

  
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
        writerSlug={writerSlug}
      />
    </Section>
  );
};

export default BookCarousel;
