import { Book, BooksWriters, Writer } from '@prisma/client'
import { Container } from '@radix-ui/themes'
import React from 'react'
import BookCarousel from '../Carousels/BookCarousel'
import { BookWithWriters, RelatedBookExtended } from '../../../../prisma/types'


interface Props {
   relatedBooks:RelatedBookExtended[]
   sourceBook:BookWithWriters
   writerSlug:string
}

const RelatedBooks = ({relatedBooks,sourceBook}:Props) => {
  return (
    <Container>
        <BookCarousel books={relatedBooks} hasTooltip ={true}  title={`If you like ${sourceBook.title}`}/>
    </Container>
  )
}

export default RelatedBooks