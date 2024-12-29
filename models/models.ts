import { writer } from "@prisma/client";

export interface WriterWithBooks {
  id: number;
  name: string;
  last_name: string;
  country: string;
  description: string | null;
  picture_url: string | null;
  slug:string;
  books: BookWithWriter[];
}

export interface BookWithWriter {
  id: number;
  title: string;
  cover_url: string | null;
  rating:number;
  genre:string;
  slug:string;
  min_price:number
  writer: {
    id: number;
    name: string;
    last_name: string;
  } | null;
}

export interface BookCarouselProps {
  books: BookWithWriter[];
  title:string
}

export interface WriterCaouselProps {
  writers: WriterWithBooks[];
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
