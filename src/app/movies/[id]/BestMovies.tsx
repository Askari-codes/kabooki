import React from 'react'
import { Container } from '@radix-ui/themes'
import { Director, Movie } from '@prisma/client'
import MovieCarousel from '../MovieCarousel'
interface Props{
    movies:Movie[]
    director:Director
}

const BestMovies = ({movies,director}:Props) => {
  return (
    <Container>
        <MovieCarousel director={director} movies={movies} title={`Best ${director.name} ${director.last_name} movies`}/>
    </Container>
  )
}

export default BestMovies