import React from "react";
import { WriterWithBooks } from "../../../models/models";
import { Swiper, SwiperSlide } from "swiper/react";
import WriterCard from "./WriterCard";

interface Props {
  writers: WriterWithBooks[];
}

const chunkArray = (array: WriterWithBooks[], size: number) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};
const WriterSwiper = ({ writers }: Props) => {
  const chunkedWriters = chunkArray(writers, 5);
  console.log('chunkedWriters are',chunkedWriters);
  
  
  
  return (
    <div>
      {chunkedWriters.map((writersGroup, index) => (
        <Swiper
          className=""
          key={index}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {writersGroup.map((writer) => (
            <SwiperSlide className="p-5 " key={writer.id}>
              <WriterCard key={writer.id} writer={writer} />
            </SwiperSlide>
          ))}
        </Swiper>
      ))}
    </div>
  );
};

export default WriterSwiper;
