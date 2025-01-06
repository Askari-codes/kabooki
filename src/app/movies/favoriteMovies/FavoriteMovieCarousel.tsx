import { Section } from '@radix-ui/themes'
import { title } from 'process'
import { FavoriteMovie } from '../../../../models/models'

interface Props {
  favoriteMovies:FavoriteMovie[]
}

const FavoriteMovieCarousel = ({favoriteMovies}:Props) => {
  return (
    <Section style={{ padding: "20px 0" }}>
      <h2 style={{ marginBottom: "20px", fontSize: "1.5rem" }}>{title}</h2>
      {/* <FavoriteBookSwiper favoriteBooks={favoriteBooks}/> */}
    </Section>
  )
}

export default FavoriteMovieCarousel
