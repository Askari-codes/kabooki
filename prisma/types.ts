import { Book, BooksWriters, Director, Movie, Writer } from "@prisma/client";

export type RelatedBookExtended = Book & {
  writer: Writer;
};

export type BookWithWriters = Book & {
  // The main writer for the page you are viewing
  writer: (Writer & {
    books: (Book & { 
      // Simplified this to keep it clean
      relatedBooks: Book[] 
    })[];
  }) | null;

  // The flattened list of related books, each containing one writer
  relatedFrom: RelatedBookExtended[]; 
  
  bookMovies: Movie&({
    director:Director
  })[];
};

export type WriterWithBooks = Writer &{
  books:(Book&{movies:Movie[]})[],
  relatedWriters:Writer[]
}

export type MovieWithDirectors = Movie&{
  directors:Director&{
    movies:Movie[]
  }
}
export type MoviesDirector = Movie&({
  director:Director
})[]
export type MoviesWithDirectors = MovieWithDirectors[]
export type DirectorWithMovies =Director&{
  movies:Movie[]
}