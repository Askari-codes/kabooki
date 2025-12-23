'use client'
import { Book, Writer } from '@prisma/client'
import { Container } from '@radix-ui/themes'
import React,{useEffect} from 'react'
import BookCarousel from '../Carousels/BookCarousel'
import { BookWithWriters } from '../../../../prisma/types'

interface Props {
  books:BookWithWriters[]
  writer:Writer
  
}

const BestBooks = ({books,writer}:Props) => {
  

  return (
    <Container>
<BookCarousel books={books}  title={`${writer.name} ${writer.last_name}'s best books`}/>
    </Container>
  )
}

export default BestBooks