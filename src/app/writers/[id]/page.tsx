import axios from "axios";
import { Book, Writer, BooksWriters, Movie } from "@prisma/client";
import { Container } from "@radix-ui/themes";
import WriterProfile from "./WriterProfile";
import WriterBooks from "./WriterBooks";
import RelatedWriters from "./RelatedWriters";
import RelatedMovies from "./RelatedMovies";
import { WriterWithBooks } from "../../../../prisma/types";
interface Props {
  params: { id: string };
}

const WriterPage = async ({ params }: Props) => {
  const id = Number(params.id);

  const writerResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/writers/${id}`
  );
  const writerInformation:WriterWithBooks=writerResponse.data
  const books:Book[]=writerInformation.books
  const relatedMovies:Movie[] = writerInformation.books.flatMap((b)=>{
    return b.movies
  })
const relatedWriters:Writer[]= writerInformation.relatedWriters



 
  

  return (
    <Container>
      <WriterProfile relatedWriters={relatedWriters} writerWithBooks={writerInformation} />
     {books.length!==0&&<WriterBooks writerInformation={writerInformation} />} 
    {relatedMovies.length!==0&& <RelatedMovies movies={relatedMovies} writerName={`${writerInformation.name} ${writerInformation.last_name}`} />}  
     {relatedWriters.length!==0&&<RelatedWriters relatedWriters={relatedWriters} writerName={writerInformation.name+''+writerInformation.last_name} />} 
    </Container>
  );
};

export default WriterPage;
