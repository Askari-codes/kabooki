import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { FavoritePodcast } from '../../../../models/models';
import FavoritePodcastCard from './FavoritePodcastCard';

interface Props {
    favoritePodcasts:FavoritePodcast[]
}

const FavoritePodcastSwiper = ({favoritePodcasts}:Props) => {
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
              {favoritePodcasts.map((podcast) => (
                <SwiperSlide className="p-5 " key={podcast.id}>
                  <FavoritePodcastCard favoritePodcast={podcast}/>
                  
                </SwiperSlide>
              ))}
            </Swiper>
      )
}

export default FavoritePodcastSwiper
