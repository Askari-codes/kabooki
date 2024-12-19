'use client'
import { book } from '@prisma/client'

interface Props{
    book:book
}

const TopBook = ({book}:Props) => {
  return (
   <div>
    {book.title}
   </div>

  )
}

export default TopBook
