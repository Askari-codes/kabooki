import { Movie } from "@prisma/client"
import axios from "axios"
import MovieCarousel from "./MovieCarousel"

const MovieSection = async () => {
    const response = await axios.get<Movie[]>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies`)
    const movies:Movie[] = response.data
    
    
  return (
    <MovieCarousel movies={movies}/>
  )
}

export default MovieSection
