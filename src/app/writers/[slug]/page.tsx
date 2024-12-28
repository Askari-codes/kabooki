import * as Separator from "@radix-ui/react-separator";
import axios from "axios";
import Image from "next/image";
import { BookWithWriter, WriterWithBooks } from "../../../../models/models";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
} from "@radix-ui/themes";
import BookCarousel from "@/app/books/BookCarousel";

interface Props {
  params: { slug: string };
}

const WriterProfile = async ({ params }: Props) => {
  const slug = params.slug;

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/writers/${slug}`
  );
  const writer: WriterWithBooks = response.data;
  const bestBooks: BookWithWriter[] = writer.books?.filter((book) => {
    return book.rating === 5;
  });
  const otherBooks = writer.books.filter(book=>{
    return book.rating!==5
  }
  )
  console.log(otherBooks);
  

  if (!writer) {
    return <p>Writer not found</p>;
  }

  return (
    <Container>
      <Flex justify='between'  >
         <Image
         width={400}
         height={400}
         style={{ width:400, height: 400, objectFit: 'cover' }}
            alt={writer.name + " " + writer.last_name}
            src={
              "/writers/" + writer.picture_url + ".jpg" ||
              "/writers/" + writer.picture_url + "jpeg"
            }
          />
         <Box className="p-5">
          <Flex direction='column'>
          <Heading className="">
            {writer.name} {writer.last_name}
          </Heading>
          <Text style={{textAlign:'justify'}}>
            {writer.description}
          </Text>
          </Flex>
          
         </Box>
        
      </Flex>

      <Separator.Root
        style={{
          margin: "1.5rem 0",
          backgroundColor: "lightgray",
          height: "1px",
        }}
      />
      <BookCarousel books={bestBooks} />

     

      <Separator.Root
        style={{
          margin: "1.5rem 0",
          backgroundColor: "lightgray",
          height: "1px",
        }}
      />
      <BookCarousel books={otherBooks} />
    </Container>
  );
};

export default WriterProfile;
