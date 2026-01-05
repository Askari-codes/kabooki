"use client";
import { Book, Writer } from "@prisma/client";
import { Container } from "@radix-ui/themes";
import React, { useEffect } from "react";
import BookCarousel from "../Carousels/BookCarousel";
import { BookWithWriters } from "../../../../prisma/types";

interface Props {
  bookWithWriters:BookWithWriters
  mainBookId?:number
}

const BestBooks = ({ bookWithWriters,mainBookId }: Props) => {
  const bestBooks:Book[] = bookWithWriters.writer!.books.filter((b)=>{return b.is_the_best&&b.id!==mainBookId})
  const  writerName:string = bookWithWriters.writer!.name+''+bookWithWriters.writer!.last_name
  return (
    <Container>
      <BookCarousel writerSlug={bookWithWriters.writer!.slug}  books={bestBooks} title={`${writerName}'s best books`} />
    </Container>
  );
};

export default BestBooks;
