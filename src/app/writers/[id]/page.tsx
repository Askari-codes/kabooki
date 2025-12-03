import axios from "axios";
import { Book, Writer, BooksWriters, Movie } from "@prisma/client";
import { Container } from "@radix-ui/themes";
import WriterProfile from "./WriterProfile";
import WriterBooks from "./WriterBooks";
import RelatedWriters from "./RelatedWriters";
import RelatedMovies from "./RelatedMovies";
interface Props {
  params: { id: string };
}

const WriterPage = async ({ params }: Props) => {
  const id = Number(params.id);

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/writers/${id}`
  );
  const { data: writer } = response;

  const writerBooksIds = writer.books;

  const booksIdList = writerBooksIds.map((writerBook: BooksWriters) => {
    return writerBook.book_id;
  });

  const books: Book[] = await Promise.all(
    booksIdList.map(async (id: number) => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/books/${id}`
      );
      return data;
    })
  );

  const relateWritersDataIds = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/relatedWriters/${id}`
  );
  const relateWritersIds = relateWritersDataIds.data;

  const relatedWriters: Writer[] = await Promise.all(
    relateWritersIds.map(async (id: Number) => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/writers/${id}`
      );
      return data;
    })
  );

  const relatedMoviesInformation: Movie[] = await Promise.all(
    booksIdList.map(async (id: number) => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/bookMovies/${id}`
      );
      if (data.length > 0) return data[0];
      return null;
    })
  );
  const relatedMovies = relatedMoviesInformation.filter((item) => {
    if (item) {
      return item;
    }
  });

  return (
    <Container>
      <WriterProfile writer={writer} books={books} />
      <WriterBooks books={books} />
      <RelatedWriters relatedWriters={relatedWriters} writer={writer} />
      <RelatedMovies movies={relatedMovies} writer={writer} />
    </Container>
  );
};

export default WriterPage;
