'use client'
import { Section } from '@radix-ui/themes'
import { FavoriteMovie } from '../../../../models/models'
import FavoriteMovieSwiper from './FavoriteMovieSwiper'

interface Props {
  favoriteMovies:FavoriteMovie[]
}

const FavoriteMovieCarousel = ({favoriteMovies}:Props) => {
  console.log(favoriteMovies);
  
  return (
    <Section style={{ padding: "20px 0" }}>
      <h2 style={{ marginBottom: "20px", fontSize: "1.5rem", fontWeight:'bold', paddingLeft:'1rem' }}>Favorite Movies</h2>
      <FavoriteMovieSwiper favoriteMovies={favoriteMovies}/>
    </Section>
  )
}

export default FavoriteMovieCarousel
