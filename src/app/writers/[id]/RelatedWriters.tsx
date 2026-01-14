import React from "react";
import {  Container } from "@radix-ui/themes";
import WriterCarousel from "../WriterCarousel";
import { Writer } from "@prisma/client";

export interface Props {
  relatedWriters: Writer[];
  writerName: string;
}

const RelatedWriters = ({ relatedWriters, writerName }: Props) => {
  return (
    <Container className="font-serif">
      <WriterCarousel
        title={"If you like" + writerName}
        writers={relatedWriters}
      />
    </Container>
  );
};

export default RelatedWriters;
