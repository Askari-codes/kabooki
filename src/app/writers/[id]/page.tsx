import axios from "axios";
import { Book } from '@prisma/client'
import { Container } from "@radix-ui/themes";
import WriterProfile from "./WriterProfile";
import WriterBooks from "./WriterBooks";



interface Props {
  params: { id: string };
}


const Writer = async ({ params }: Props) => {
  const id = Number (params.id);

  

  const writerDetails = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/writers/${id}`
  );
  const writer= writerDetails.data

  const writerBooksIds = writerDetails.data.books
  let booksIdList =[]
  
    for(const writerbook of writerBooksIds){
      const bookId=writerbook.book_id
      booksIdList.push(bookId)     
    }
    
    const books:Book[] = await Promise.all(
      booksIdList.map(async(id)=>{
    const {data} = await     axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/books/${id}`
        );
        return data
      })
    )
  
  
  return (
    <Container>
      <WriterProfile writer={writer} books={books}/>
      <WriterBooks books={books}/>
    
     
    </Container>
  );
};

export default Writer;
