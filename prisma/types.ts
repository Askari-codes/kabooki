import { Book, BooksWriters, Writer } from "@prisma/client";

export type BookWithWriters = Book & {
  writers: (BooksWriters & {
    writer: Writer;
  })[];
};