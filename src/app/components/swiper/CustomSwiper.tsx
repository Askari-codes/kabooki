'use client';
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperContent from "../SwiperContent";
import { BookWithWriter,CustomSwiperProps,WriterWithBooks } from "../../../../models/models";

const chunkArray = (array:BookWithWriter[]|WriterWithBooks[], size:number) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};



const CustomSwiper = ({ books, writers }: CustomSwiperProps) => {
  const isBooks = !!books; 
  const items = books || writers || []; 
  const chunkedItems = chunkArray(items, 5);
  
  
  return (

    <>
    {chunkedItems.map((group,index)=>(
       <Swiper className=""  key={index} 
      spaceBetween={20}
      slidesPerView={1}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1280: { slidesPerView: 4 },
      }}
    >
      {group.map((item)=>(
        <SwiperSlide className="p-5 "  key={item.id}>
            <SwiperContent
            key={isBooks ? (item as BookWithWriter).id : (item as WriterWithBooks).id }
                      book={isBooks ? (item as BookWithWriter) : undefined}
                      writer={!isBooks ? (item as WriterWithBooks) : undefined}
            />
            
        </SwiperSlide>
      ))}
    </Swiper>
    ))}
    </>
    
  );
};

export default CustomSwiper;
