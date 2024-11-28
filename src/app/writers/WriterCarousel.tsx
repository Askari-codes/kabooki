"use client";
import {
  Section
} from "@radix-ui/themes";
import "swiper/css";
import CustomSwiper from "../components/swiper/CustomSwiper";
import { WriterCaouselProps } from "../../../models/models";


const WriterCarousel = ({writers}:WriterCaouselProps) => {


  return (
    <Section style={{ padding: "20px 0" }}>
      <h2 style={{ marginBottom: "20px", fontSize: "1.5rem" }}>Writers</h2>
      <CustomSwiper writers={writers}/>
    </Section>
  );
};

export default WriterCarousel;
