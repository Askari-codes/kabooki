import React from "react";
import { Container } from "@radix-ui/themes";
import { Movie, Writer } from "@prisma/client";
import MovieCarousel from "@/app/movies/MovieCarousel";
import Seprator from "@/app/components/Seprator";
interface Props {
  movies: Movie[];
  writerName:string
}

const RelatedMovies = ({ movies, writerName }: Props) => {
  return (
    <Container className="font-serif">
      <MovieCarousel
        title={` Movies which are made based on ${writerName} novels`}
        movies={movies}
      />
      <Seprator/>
    </Container>
  );
};

export default RelatedMovies;
