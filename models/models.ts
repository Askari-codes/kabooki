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

export interface MySectionProps {
  writers: Writer[];
}