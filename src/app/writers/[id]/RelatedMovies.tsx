'use client'
import React, { useEffect } from "react";
import { Container } from "@radix-ui/themes";
import { Movie, Writer } from "@prisma/client";
import MovieCarousel from "@/app/movies/MovieCarousel";
import Seprator from "@/app/components/Seprator";
import { MovieWithDirector } from "../../../../prisma/types";
interface Props {
 MoviesWithDirector:MovieWithDirector[]
  writerName:string
}

const RelatedMovies = ({ MoviesWithDirector, writerName }: Props) => {
  useEffect(()=>{
    console.log(MoviesWithDirector)
  },[])
  return (
    <Container className="font-serif">
      <MovieCarousel
        title={` Movies which are made based on ${writerName} novels`}
        movies={MoviesWithDirector}
      />
      <Seprator/>
    </Container>
  );
};

export default RelatedMovies;
