"use client";
import React, { useState } from "react";
import * as Separator from "@radix-ui/react-separator";
import { Book } from "@prisma/client";
import { Box, Button, Container, Flex } from "@radix-ui/themes";
import BookCarousel from "@/app/books/BookCarousel";
import { motion, AnimatePresence } from "framer-motion";

export interface Props {
  books: Book[];
}

const WriterBooks = ({ books }: Props) => {
  const [page, setPage] = useState(1);

  const bestBooks = books.filter((book) => book.is_the_best);
  const otherBooks = books.filter((book) => book.is_the_best === false);
  const freeBooks = books.filter((book) => book.min_price === 0);

  const booksPerPage = 10;
  const totalPages = Math.ceil(otherBooks.length / booksPerPage);

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <Container>
      <BookCarousel title="Selected Books" books={bestBooks} />

      <Separator.Root
        style={{
          margin: "1.5rem 0",
          backgroundColor: "lightgray",
          height: "1px",
        }}
      />

      <AnimatePresence>
        {Array.from({ length: page }).map((_, i) => {
          const start = i * booksPerPage;
          const end = start + booksPerPage;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              style={{ marginBottom: "1.5rem" }}
            >
              <BookCarousel
                title={i === 0 ? "Other Books" : ""}
                books={otherBooks.slice(start, end)}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>

      <Flex
        justify="between"
        align="center"
        style={{ marginTop: "1rem", marginBottom: "2rem" }}
      >
        {page < totalPages ? (
          <Button onClick={handleNext} variant="soft" color="blue">
            + More Books
          </Button>
        ) : (
          <Box />
        )}

        {page > 1 && (
          <Button onClick={handlePrev} variant="surface" color="gray">
            − Fewer Books
          </Button>
        )}
      </Flex>

      {freeBooks.length > 0 && (
        <>
          <Separator.Root
            style={{
              margin: "1.5rem 0",
              backgroundColor: "lightgray",
              height: "1px",
            }}
          />
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
