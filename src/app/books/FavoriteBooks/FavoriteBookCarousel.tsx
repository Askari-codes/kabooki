"use client";
import { Section } from "@radix-ui/themes";
import "swiper/css";
import { FavoriteBook } from "../../../../models/models";
import FavoriteBookSwiper from "./FavoriteBookSwiper";

interface Props{
  favoriteBooks:FavoriteBook[],
    title:string
}

const FavoriteBookCarousel = ({ favoriteBooks,title='Favorite Books' }: Props) => {
  

  return (
    <Section style={{ padding: "20px 0" }}>
      <h2 style={{ marginBottom: "20px", fontSize: "1.5rem", fontWeight:'bold', paddingLeft:'1rem' }}>{title}</h2>
      <FavoriteBookSwiper favoriteBooks={favoriteBooks}/>
    </Section>
  );
};

export default FavoriteBookCarousel;