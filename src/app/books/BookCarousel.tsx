"use client";
import { Section, Heading } from "@radix-ui/themes";
import "swiper/css";
import BookSwiper from "./BookSwiper";
import { Book, Writer } from "@prisma/client";

interface Props {
  title: string;
  books: Book[];
  showDownloadButton?: boolean;
  writer?: Writer;
}

const BookCarousel = ({
  books,
  title,
  writer,
  showDownloadButton = false,
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
        writer={writer}
        showDownloadButton={showDownloadButton}
        books={books}
      />
    </Section>
  );
};

export default BookCarousel;
