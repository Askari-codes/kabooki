import { Writer, Genre } from "@prisma/client";

export interface WriterWithBooks {
  id: number;
  name: string;
  last_name: string;
  country: string;
  description: string | null;
  picture_url: string | null;
  books: BookWithWriter[];
}

export interface BookWithWriter {
  id: number;
  title: string;
  picture_url: string | null;
  rating:number;
  genre:Genre;
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
  writers: WriterWithBooks[];
}
export interface GenreCraouselProps {
  genres: Genre[];
}
export interface SelectedBooksProps {
  writer: WriterWithBooks;
}
export interface CustomSwiperProps {
  books?: BookWithWriter[];
  writers?:WriterWithBooks[]
}
export interface CustomerSwiperSlideProps {
  book?: BookWithWriter;
  writer?:WriterWithBooks
}
