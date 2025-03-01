import { Swiper, SwiperSlide } from "swiper/react";
import { FavoriteBook } from "../../../../models/models";
import FavoriteBookCard from "./FavoriteBookCard";

interface Props {
  favoriteBooks: FavoriteBook[];
}


const FavoriteBookSwiper = ({ favoriteBooks }: Props) => {
  
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
          {favoriteBooks.map((favoriteBook) => (
            <SwiperSlide className="p-5 " key={favoriteBook.id}>
              <FavoriteBookCard key={favoriteBook.id} favoriteBook={favoriteBook} />
            </SwiperSlide>
          ))}
        </Swiper>
  );
};

export default FavoriteBookSwiper;
