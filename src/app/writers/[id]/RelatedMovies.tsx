import React from "react";
import { Container } from "@radix-ui/themes";
import { Movie, Writer } from "@prisma/client";
import MovieCarousel from "@/app/movies/MovieCarousel";
interface Props {
  movies: Movie[];
  writer: Writer;
}

const RelatedMovies = ({ movies, writer }: Props) => {
  return (
    <Container className="font-serif">
      <MovieCarousel
        title={` Movies which are made based on ${writer.name} ${writer.last_name} novels`}
        movies={movies}
      />
    </Container>
  );
};

export default RelatedMovies;
