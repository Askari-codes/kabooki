import React from "react";
import MovieProfile from "./MovieProfile";
import axios from "axios";
import {
  DirectorWithMovies,
  MovieWithDirectors,
} from "../../../../prisma/types";
import { Director, Movie } from "@prisma/client";
import BestMovies from "./BestMovies";
interface Props {
  params: { id: string };
}
const MoviePage = async ({ params }: Props) => {
  const movieId = Number(params.id);
  const movieInformation = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/movies/${movieId}`,
  );
  const movie: MovieWithDirectors = movieInformation.data;
  const director: DirectorWithMovies = movie.directors;
  const movies: Movie[] = director.movies;
  const bestMovies: Movie[] = movies.filter(
    (m) => m.rating >= 8 && m.id !== movieId,
  );
  console.log(bestMovies);

  return (
    <>
      <MovieProfile director={director} movie={movie} />
      <BestMovies movies={bestMovies} director={director}/>
    </>
  );
};

export default MoviePage;
