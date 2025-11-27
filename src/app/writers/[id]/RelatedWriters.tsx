import React from 'react'
import { Box, Button, Container, Flex, Heading, Text } from "@radix-ui/themes";
import WriterCarousel from '../WriterCarousel';
import { Writer } from '@prisma/client';

export interface Props{
    relatedWriters:Writer[]
    writer:Writer
}


const RelatedWriters = ({relatedWriters,writer}:Props) => {
  return (
    <Container>
        <WriterCarousel title={'if you like'+writer.name+''+writer.last_name} writers={relatedWriters}/>
    </Container>
  )
}

export default RelatedWriters