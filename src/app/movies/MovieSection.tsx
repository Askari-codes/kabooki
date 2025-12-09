import { Movie } from "@prisma/client"
import MovieCarousel from "./MovieCarousel"

interface MovieSection {
  movies:Movie[]
}

const MovieSection = async ({movies}:MovieSection) => {
   
    
    
  return (
    <MovieCarousel title="Movies" movies={movies}/>
  )
}

export default MovieSection
