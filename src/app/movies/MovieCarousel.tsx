"use client";
import {
    Section
} from "@radix-ui/themes";
import "swiper/css";
import MovieSwiper from "./MovieSwiper";
import { Movie } from "@prisma/client";

interface Props {
    movies:Movie[]
}

const MovieCarousel = ({movies}:Props) => {



  return (
    <Section style={{ padding: "20px 0" }}>
      {movies.length?<h2 style={{ marginBottom: "20px", fontSize: "1.5rem" }}>movies</h2>:''}
      <MovieSwiper movies={movies}/>
    </Section>
  );
};

export default MovieCarousel;

