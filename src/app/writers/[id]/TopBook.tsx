'use client'
import { Book } from '@prisma/client'

interface Props{
    book:Book
}

const TopBook = ({book}:Props) => {
  return (
   <div>
    {book.title}
   </div>

  )
}

export default TopBook
