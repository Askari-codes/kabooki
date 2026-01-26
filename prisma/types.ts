import { Book, BooksWriters, Director, Movie, Prisma, Writer } from "@prisma/client";

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

export type MovieWithDirector = Prisma.MovieGetPayload<{
  include: { director: { include: { movies: true } } };
}>;
export type DirectorWithMovies= Prisma.DirectorGetPayload<{
  include:{movies:true}
}>

export type MoviesDirector = Movie&({
  director:Director
})[]
// export type MoviesWithDirectors = MovieWithDirectors[]

