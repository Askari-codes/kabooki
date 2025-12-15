import React, { useEffect } from "react";
import {
  AspectRatio,
  Box,
  Flex,
  Text,
  Button,
  Badge,
  Container,
} from "@radix-ui/themes";
import { DividerHorizontalIcon, DownloadIcon } from "@radix-ui/react-icons";
import { Book, Writer } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import StarRating from "../components/StarRating";
import { log } from "console";

interface Props {
  book: Book;
  showDownloadButton?: boolean;
  writer?:Writer
}

const BookCard = ({ book,writer}: Props) => {
  useEffect(()=>{
    console.log('title',book.title)
  },[])
  return (
    <Flex  direction={"column"} justify={"between"} height={'510px'} >
      <AspectRatio className="h-[400px] "  ratio={8 / 12}>
        <Flex gap='1'  direction="column">
          {!book.min_price ? (
            <Badge className=" " size={"3"}>
             <Flex className="w-[100%] " justify={'between'}>
              <Text className="">
                Free
              </Text>
              <div className="">
                <StarRating rating={book.rating} />
              </div>
              </Flex> 
            </Badge>
          ) : (
            <Badge className=" " size={"3"}>
             <Flex className="w-[100%] " justify={'center'}>
              <Text className="">
               
              </Text>
              <div className="">
                <StarRating rating={book.rating} />
              </div>
              </Flex> 
            </Badge>
          )}
          <Image
            width={300}
            height={200}
            src={`/books/${writer?.slug}/${book.cover_url}`}
            alt={book.title}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              borderRadius: "var(--radius-2)",
              
            }}
          />
        </Flex>
      </AspectRatio>
     
       <div className="h-[100px] flex justify-center items-baseline text-[1.5rem]">
         <Link className=" font-serif font-semibold  " href={`/books/${book.id}`}>
          {book.title}{" "}
        </Link>
       </div>
       
      </Flex>
   
  );
};

export default BookCard;


