import { Book, Writer } from '@prisma/client'
import { Container } from '@radix-ui/themes'
import React from 'react'
import BookCarousel from '../BookCarousel'
import BookCarouselWithPagination from '../BookCarouselWithPagination'

interface Props {
  books:Book[]
  writer:Writer
}

const OtherBooks = ({books,writer}:Props) => {
  return (
    <Container>
      <BookCarouselWithPagination books={books} title={`Other ${writer.name} ${writer.last_name}'s Books`}/>
    </Container>
  )
}

export default OtherBooks