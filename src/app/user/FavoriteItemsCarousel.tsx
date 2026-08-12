"use client";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { OrbitItem } from "./FavoriteOrbit";

interface Props {
  title: string;
  items: OrbitItem[];
}

const FavoriteItemsCarousel = ({ title, items }: Props) => {
  if (items.length === 0) return null;

  return (
    <div>
      <h2 className="mb-4 font-serif text-xl font-bold text-[#2f2418]">{title}</h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={2}
        breakpoints={{
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
      >
        {items.map((item) => {
          const cover = (
            <div className="overflow-hidden rounded-xl border border-[#e8dfd0] bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
              <div className="relative aspect-[2/3] w-full">
                <Image src={item.image} alt={item.title} fill style={{ objectFit: "cover" }} />
              </div>
              <p className="truncate px-2 py-2 text-center font-serif text-sm text-[#2f2418]">
                {item.title}
              </p>
            </div>
          );

          return (
            <SwiperSlide key={item.title} className="!h-auto pb-2">
              {item.href ? <Link href={item.href}>{cover}</Link> : cover}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default FavoriteItemsCarousel;
