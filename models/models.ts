import { Book, Writer, Genre } from "@prisma/client";

export interface WriterWithBooks {
  id: number;
  name: string;
  last_name: string;
  country: string;
  description: string | null;
  picture_url: string | null;
  books: Book[];
}

export interface BookWithWriter {
  id: number;
  title: string;
  picture_url: string | null;
  writer: {
    id: number;
    name: string;
    last_name: string;
  } | null;
}

export interface BookCarouselProps {
  books: BookWithWriter[];
}

export interface WriterCaouselProps {
  writers: Writer[];
}
export interface GenreCraouselProps {
  genres: Genre[];
}
