import React from 'react'
import { Container } from '@radix-ui/themes'
import { Director, Movie } from '@prisma/client'
import MovieCarousel from '../MovieCarousel'
import { DirectorWithMovies } from '../../../../prisma/types'
interface Props{
   directorWithMovies:DirectorWithMovies
}

const BestMovies = ({directorWithMovies}:Props) => {
  const {movies,...director} =directorWithMovies
  
  
  return (
    <Container>
        <MovieCarousel director={director} movies={movies} title={`Best ${director.name} ${director.last_name} movies`}/>
    </Container>
  )
}

export default BestMovies