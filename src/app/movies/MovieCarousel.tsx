"use client";
import { Heading, Section } from "@radix-ui/themes";
import "swiper/css";
import MovieSwiper from "./MovieSwiper";
import { Director, Movie } from "@prisma/client";

interface Props {
  movies: Movie[];
  title: string;
   director:Director
}

const MovieCarousel = ({ movies, title,director }: Props) => {
  return (
    <Section style={{ padding: "20px 0" }}>
      {movies.length ? (
        <Heading color="cyan" className="m-3" size={"7"}>
          {title}
        </Heading>
      ) : (
        ""
      )}
      <MovieSwiper movies={movies} director={director} />
    </Section>
  );
};

export default MovieCarousel;
