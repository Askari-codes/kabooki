'use client'
import { Director, Movie } from '@prisma/client'
import React from 'react'
import { chunkArray } from '../utilities/services'
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from './MovieCard';



interface Props{
    movies:Movie[]
    director:Director
}

const MovieSwiper = ({movies,director}:Props) => {
  const chunkedMovies =  chunkArray(movies,10)
  const fristArray = chunkedMovies[0]
  
  
  
  return (
    <div>
      
        <Swiper
          className=""
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {fristArray.map((movie) => (
            <SwiperSlide className="p-5 " key={movie.id}>
             <MovieCard director={director} movie={movie}/>
            </SwiperSlide>
          ))}
        </Swiper>
    
    </div>
  )
}

export default MovieSwiper
