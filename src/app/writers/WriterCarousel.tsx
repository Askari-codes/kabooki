"use client";
import {
  Section
} from "@radix-ui/themes";
import "swiper/css";
import WriterSwiper from "./WriterSwiper";
import { Writer } from "@prisma/client";
interface Props{
  writers:Writer[]
  title:string
}

const WriterCarousel = ({writers,title}:Props) => {



  return (
    <Section style={{ padding: "20px 0" }}>
    {writers.length?  <h2 style={{ marginBottom: "20px", fontSize: "1.5rem" }}>{title}</h2>:''}
      <WriterSwiper writers={writers}/>
    </Section>
  );
};

export default WriterCarousel;
