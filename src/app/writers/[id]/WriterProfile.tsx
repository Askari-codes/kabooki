import React from 'react'
import * as Separator from "@radix-ui/react-separator";
import { Box, Button, Container, Flex, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import { Book, Writer } from '@prisma/client';
import TextWithLinks from "@/app/components/TextWithLinks";


export interface Props{
    writer:Writer,
    books:Book[]
}


const WriterProfile = ({writer,books}:Props) => {
  return (
   <Container>
      <Flex justify="between">
        <Image
          width={400}
          height={400}
          style={{ width: 400, height: 400, objectFit: "cover" }}
          alt={writer.name + " " + writer.last_name}
          src={
            "/writers/" + writer.picture_url  ||
            "/writers/" + writer.picture_url + "jpeg"
          }
        />
        <Box className="p-5">
          <Flex direction="column">
            <Heading className="">
              {writer.name} {writer.last_name}
            </Heading>
            <TextWithLinks books={books} description={writer.description}/>
            
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
   </Container>
  )
}

export default WriterProfile