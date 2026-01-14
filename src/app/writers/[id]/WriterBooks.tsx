"use client";
import React from "react";
import Seprator from "@/app/components/Seprator";
import { Book, Writer } from "@prisma/client";
import {Container} from "@radix-ui/themes";
import BookCarousel from "@/app/books/Carousels/BookCarousel";
import BookCarouselWithPagination from "@/app/books/Carousels/BookCarouselWithPagination";
import { WriterWithBooks } from "../../../../prisma/types";

export interface Props {
 writerInformation:WriterWithBooks
}

const WriterBooks = ({ writerInformation }: Props) => {
  const bestBooks:Book[] = writerInformation.books.filter((book) => book.is_the_best);
  const otherBooks:Book[] = writerInformation.books.filter((book) => book.is_the_best === false);
  const freeBooks:Book[] = writerInformation.books.filter((book) => book.min_price === 0);
  

  return (
    <Container>
      <BookCarousel writerSlug={writerInformation.slug}  title="Selected Books" books={bestBooks} />
      <Seprator />
      <BookCarouselWithPagination writerSlug={writerInformation.slug}  books={otherBooks} title='Other Books' />
      {freeBooks.length > 0 && (
        <>
          <Seprator />
          <BookCarousel
            title="Free Books"
            books={freeBooks}
            writerSlug={writerInformation.slug}
            
          />
        <Seprator/>
        </>
      )}

    </Container>
  );
};

export default WriterBooks;
