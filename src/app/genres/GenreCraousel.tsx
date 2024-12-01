'use client'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  Section,
  Box,
  Card,
  Inset,
  Text,
} from "@radix-ui/themes";
import { GenreCraouselProps } from "../../../models/models";
import Image from "next/image";





const WriterCarousel = ({ genres }: GenreCraouselProps) => {


  return (
    <Section style={{ padding: "20px 0" }}>
      <h2 style={{ marginBottom: "20px", fontSize: "1.5rem" }}>Genres</h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={4}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {genres?.map(({ id, name,iconUrl }) => (
          <SwiperSlide key={id}>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card
                size="2"
                style={{
                  maxWidth: "300px",
                  height:'250px',
                  textAlign: "center",
                  border: "1px solid var(--gray-300)",
                  padding: "20px",
                  borderRadius: "10px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Inset
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <Image
                   src={'/genres/'+iconUrl+".jpg"||'/genres/'+iconUrl+'jpeg'}
                    alt={` ${iconUrl}`}
                    width={300}
                    height={300}
                    style={{
                      objectFit: "cover",
                      height: "120px",
                      width: "120px",
                      borderRadius: "50%",
                      border: "2px solid var(--gray-300)",
                    }}
                  />
                </Inset>
                <Text
                  as="p"
                  size="3"
                  style={{
                    fontWeight: "bold",
                    margin: "10px 0",
                  }}
                >
                  {name} 
                </Text>
                <Text
                  as="p"
                  size="2"
                  style={{
                    color: "var(--gray-600)",
                    fontSize: "0.9rem",
                    lineHeight: "1.4",
                  }}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Id quia magnam a officiis quos dolorum eius laborum ipsum, tenetur ad.
                </Text>
              </Card>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Section>
  );
};

export default WriterCarousel;
