"use client";
import { Section } from "@radix-ui/themes";
import "swiper/css";
import { UserFavoriteBook } from "@prisma/client";
import BookSwiper from "../BookSwiper";
import FavoriteBookSwiper from "./FavoriteBookSwiper";
import { Facebook } from "next/dist/lib/metadata/types/extra-types";
import { FavoriteBook } from "../../../../models/models";

interface Props{
  favoriteBooks:FavoriteBook[],
    title:string
}

const FavoriteBookCarousel = ({ favoriteBooks,title }: Props) => {
  

  return (
    <Section style={{ padding: "20px 0" }}>
      <h2 style={{ marginBottom: "20px", fontSize: "1.5rem" }}>{title}</h2>
      <FavoriteBookSwiper favoriteBooks={favoriteBooks}/>
    </Section>
  );
};

export default FavoriteBookCarousel;