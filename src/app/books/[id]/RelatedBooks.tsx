import { Book, BooksWriters, Writer } from '@prisma/client'
import { Container } from '@radix-ui/themes'
import React from 'react'
import BookCarousel from '../Carousels/BookCarousel'
import { BookWithWriters } from '../../../../prisma/types'


interface Props {
   books:BookWithWriters[]
   sourceBook:Book
}

const RelatedBooks = ({books,sourceBook}:Props) => {
  return (
    <Container>
        <BookCarousel books={books} hasTooltip ={true}  title={`If you like ${sourceBook.title}`}/>
    </Container>
  )
}

export default RelatedBooks