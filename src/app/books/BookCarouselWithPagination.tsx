'use client'
import { Box, Button, Container, Flex } from "@radix-ui/themes";
import BookCarousel from "./BookCarousel";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Book, Writer } from "@prisma/client";

interface Propse {
  books: Book[];
  title:string,
  writer?:Writer
}

const BookCarouselWithPagination = ({ books,title,writer }: Propse) => {
  const [page, setPage] = useState(1);

  const booksPerPage = 10;
  const totalPages = Math.ceil(books.length / booksPerPage);

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  return (
    <Container>
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
                title={i === 0 ? title : ""}
                books={books.slice(start, end)}
                writer={writer}
               
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
    </Container>
  );
};

export default BookCarouselWithPagination;
