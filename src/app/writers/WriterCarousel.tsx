"use client";
import {
  Section
} from "@radix-ui/themes";
import "swiper/css";
import WriterSwiper from "./WriterSwiper";
import { Writer } from "@prisma/client";
interface Props{
  writers:Writer[]
}

const WriterCarousel = ({writers}:Props) => {



  return (
    <Section style={{ padding: "20px 0" }}>
      <h2 style={{ marginBottom: "20px", fontSize: "1.5rem" }}>Writers</h2>
      <WriterSwiper writers={writers}/>
    </Section>
  );
};

export default WriterCarousel;
