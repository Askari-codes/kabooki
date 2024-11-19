"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Section, Box, Card, Inset, Strong, Text } from "@radix-ui/themes";
import { Book } from "@prisma/client";


interface BookCarouselProps {
  books: Book[];
}

const BookCarousel = ({ books }: BookCarouselProps) => {
  return (
    <Section style={{ padding: "20px 0" }}>
      <h2 style={{ marginBottom: "20px", fontSize: "1.5rem" }}>Books</h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={4}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {books.map(({ id, title, picture_url, }) => (
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
                  height: "350px",
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
                  <img
                    src={picture_url || "default-cover.jpg"}
                    alt={title}
                    style={{
                      objectFit: "cover",
                      height: "160px",
                      width: "120px",
                      borderRadius: "8px",
                      border: "1px solid var(--gray-300)",
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
                  {title}
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
                  by {''}
                </Text>
                <Text
                  as="p"
                  size="2"
                  style={{
                    color: "var(--gray-500)",
                    fontSize: "0.8rem",
                    marginTop: "10px",
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 3, // Limit to 3 lines
                  }}
                >
                  {''}
                </Text>
              </Card>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Section>
  );
};

export default BookCarousel;
