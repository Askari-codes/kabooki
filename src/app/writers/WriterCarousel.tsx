"use client";
import { Heading, Section } from "@radix-ui/themes";
import "swiper/css";
import WriterSwiper from "./WriterSwiper";
import { Writer } from "@prisma/client";
interface Props {
  writers: Writer[];
  title: string;
}

const WriterCarousel = ({ writers, title }: Props) => {
  return (
    <Section style={{ padding: "20px 0" }}>
      {writers.length ? (
       <Heading color="cyan" className="m-3" size={"7"}>
          {title}
        </Heading>
      ) : (
        ""
      )}
      <WriterSwiper writers={writers} />
    </Section>
  );
};

export default WriterCarousel;
