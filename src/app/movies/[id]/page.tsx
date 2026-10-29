import React from "react";
import MovieProfile from "./MovieProfile";
import axios from "axios";
import {
  MovieWithDirector,
} from "../../../../prisma/types";
import BestMovies from "./BestMovies";


interface Props {
  params: Promise<{ id: string }>;
}
const MoviePage = async (props: Props) => {
  const params = await props.params;
  const movieId = Number(params.id);
  const movieInformation = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/movies/${movieId}`,
  );
  const movieWithDirector:MovieWithDirector = movieInformation.data
  console.log('director with...',movieWithDirector)

  return (
    <>
      <MovieProfile movie={movieWithDirector} />
      <BestMovies movieId={movieId} movieWithDirector={movieWithDirector}/>
    
    </>
  );
};

export default MoviePage;
