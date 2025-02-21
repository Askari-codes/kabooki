'use client'
import React from 'react'
import { PodcastWithHost } from '../../../models/models'
import { Swiper, SwiperSlide } from "swiper/react";
import PodcastCard from './PodcastCard';

interface Props{
    podcasts:PodcastWithHost[]
}

const PodcastSwiper = ({podcasts}:Props) => {
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
    {podcasts.map((podcast)=>(
        <SwiperSlide key={podcast.id} className='p-5'>
<PodcastCard podcast={podcast}/>
        </SwiperSlide>
    ))}
    </Swiper>
   </div>
  )
}

export default PodcastSwiper
