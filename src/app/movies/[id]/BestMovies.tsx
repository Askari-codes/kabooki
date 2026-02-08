'use client'
import React, { useEffect } from 'react'
import { Container } from '@radix-ui/themes'
import { Director, Movie } from '@prisma/client'
import MovieCarousel from '../MovieCarousel'
import {  MovieCardPayload, MovieWithDirector } from '../../../../prisma/types'
interface Props{
   movieWithDirector:MovieWithDirector
   movieId:number
}

const BestMovies = ({movieWithDirector,movieId}:Props) => {
  
  
  const bestMovies:MovieCardPayload[] = movieWithDirector.director!.movies.filter((m:Movie)=>m.id!=movieId)

  useEffect(()=>{
    console.log('movies',bestMovies)
    console.log('director',bestMovies)
  },[])
  
  return (
    <Container>
        <MovieCarousel  movies={bestMovies} title={`Best ${movieWithDirector.director!.name} ${movieWithDirector.director!.last_name} movies`}/>
    </Container>
  )
}

export default BestMovies