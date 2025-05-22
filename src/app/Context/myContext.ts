import { Book, Director, Movie, Writer } from "@prisma/client";
import React, { createContext } from "react";
export interface SearchResult {
    books: Book[];
    directors: Director[];
    movies: Movie[];
    writers: Writer[];
  }
interface MyContextType {
    result:SearchResult|undefined;
    setResult:React.Dispatch<React.SetStateAction<SearchResult|undefined>>
}

export const MyContext= createContext<MyContextType|undefined>(undefined)