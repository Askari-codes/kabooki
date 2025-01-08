import { Swiper, SwiperSlide } from "swiper/react";
import { FavoriteMovie } from '../../../../models/models';
import FavoriteMovieCard from './FavoriteMovieCard';

interface Props {
    favoriteMovies:FavoriteMovie[]
    
}

const FavoriteMovieSwiper = ({favoriteMovies}:Props) => {
  return (
    <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {favoriteMovies.map((favoriteMovie) => (
            <SwiperSlide className="p-5 " key={favoriteMovie.id}>
              <FavoriteMovieCard favoriteMovie={favoriteMovie}/>
              
            </SwiperSlide>
          ))}
        </Swiper>
  )
}

export default FavoriteMovieSwiper
