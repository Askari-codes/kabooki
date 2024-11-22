'use client'
import { SelectedBooksProps } from "../../../../models/models";




const SelectedBooks = ({ writer }: SelectedBooksProps) => {
  return (
    <div>
      {writer.books.map((book)=>(
        <div key={book.id}>
          {book.title}
        </div>
      ))}
    </div>
  );
};

export default SelectedBooks;