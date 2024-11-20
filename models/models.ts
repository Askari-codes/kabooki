import { Book, Writer } from "@prisma/client";

export interface WriterWithBooks {
    id: number;
    name: string;
    last_name: string;
    country: string;
    description: string | null;
    picture_url: string | null;
    books: Book[]; 
}

  export interface BookCarouselProps{
    books: BookWithWriter[];
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
  


export interface WriterCaouselProps {
  writers: Writer[];
}