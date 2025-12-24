import { Book, BooksWriters, Movie, Writer } from "@prisma/client";

export type BookWithWriters = Book & {
  writers: (BooksWriters & {
    writer: Writer;
  })[];
};

export type WriterWithBooks = Writer &{
  books:(Book&{movies:Movie[]})[]
}