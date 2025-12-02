import React, { useEffect } from "react";
import { AspectRatio, Box, Flex, Text,Button } from "@radix-ui/themes";
import { DownloadIcon } from "@radix-ui/react-icons"
import { Book } from '@prisma/client'
import Image from "next/image";
import Link from "next/link";
import StarRating from "../components/StarRating";

interface Props {
  book: Book;
  showDownloadButton?:boolean;
}

const BookCard = ({ book,showDownloadButton }: Props) => {
  useEffect(()=>{
    console.log('log',book.pdf_url);
    
  },[])
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Flex direction={"column"} width={"100%"}>
        <AspectRatio ratio={8 / 12}>
        {showDownloadButton && <Link  target="_blank"   className=" flex justify-start p-1 " href={`${book.pdf_url}`} download> <Button   variant="soft" color="blue">
           <DownloadIcon className="text-blue-800 h-5 w-5 cursor-pointer"/>
          </Button></Link>}
          <Image
            width={300}
            height={200}
            src={
              `/books/${book.title}.jpg` 
            }
            alt={book.title}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              borderRadius: "var(--radius-2)",
            }}
          />
        </AspectRatio>
        <Text size={"6"}  className="mt-2" weight="medium">
          <Link  href={`books/${book.id}`}>{book.title}  </Link >
        </Text>
        <Box>
          <StarRating rating={book.rating} />
        </Box>
      </Flex>
    </Box>
  );
};

export default BookCard;
