"use client";
import React from "react";
import Seprator from "@/app/components/Seprator";
import { Book } from "@prisma/client";
import {Container} from "@radix-ui/themes";
import BookCarousel from "@/app/books/BookCarousel";
import BookCarouselWithPagination from "@/app/books/BookCarouselWithPagination";

export interface Props {
  books: Book[];
}

const WriterBooks = ({ books }: Props) => {
  const bestBooks = books.filter((book) => book.is_the_best);
  const otherBooks = books.filter((book) => book.is_the_best === false);
  const freeBooks = books.filter((book) => book.min_price === 0);

  return (
    <Container>
      <BookCarousel title="Selected Books" books={bestBooks} />
      <Seprator />
      <BookCarouselWithPagination books={otherBooks} title='Other Books' />
      {freeBooks.length > 0 && (
        <>
          <Seprator />
          <BookCarousel
            title="Free Books"
            books={freeBooks}
            showDownloadButton
          />
        </>
      )}
    </Container>
  );
};

export default WriterBooks;
