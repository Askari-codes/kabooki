import React from "react";
import { Writer } from "@prisma/client";
import { Swiper, SwiperSlide } from "swiper/react";
import WriterCard from "./WriterCard";
import { chunkArray } from "../utilities/services";

interface Props {
  writers: Writer[];
}


const WriterSwiper = ({ writers }: Props) => {
  const chunkedWriters = chunkArray(writers, 5);
  const [firstChunked,...rest]=chunkedWriters;
  
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
          {firstChunked.map((writer) => (
            <SwiperSlide className="p-5 " key={writer.id}>
              <WriterCard key={writer.id} writer={writer} />
            </SwiperSlide>
          ))}
        </Swiper>
      
    </div>
  );
};

export default WriterSwiper;
