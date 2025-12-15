import React from "react";
import {  Container } from "@radix-ui/themes";
import WriterCarousel from "../WriterCarousel";
import { Writer } from "@prisma/client";

export interface Props {
  relatedWriters: Writer[];
  writer: Writer;
}

const RelatedWriters = ({ relatedWriters, writer }: Props) => {
  return (
    <Container className="font-serif">
      <WriterCarousel
        title={"If you like" + writer.name + "" + writer.last_name}
        writers={relatedWriters}
      />
    </Container>
  );
};

export default RelatedWriters;
