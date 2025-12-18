'use client'
import { Book, Writer } from '@prisma/client'
import { Container } from '@radix-ui/themes'
import React,{useEffect} from 'react'
import BookCarousel from '../BookCarousel'
import BookCarouselWithPagination from '../BookCarouselWithPagination'

interface Props {
  books:Book[]
  writer:Writer
}

const BestBooks = ({books,writer}:Props) => {
  

  return (
    <Container>
<BookCarousel books={books} writer={writer} title={`${writer.name} ${writer.last_name}'s best books`}/>
    </Container>
  )
}

export default BestBooks