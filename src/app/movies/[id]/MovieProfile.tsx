"use client";
import React, { useEffect } from 'react'
import { Box, Container, Flex, Heading } from '@radix-ui/themes'
import Seprator from "@/app/components/Seprator";
import Image from "next/image";
import TextWithLinks from '@/app/components/TextWithLinks';
import { Director, Movie } from '@prisma/client';
import { MovieWithDirector} from '../../../../prisma/types';

interface Props{
    movie:MovieWithDirector
}

const MovieProfile = ({movie}:Props) => {

  useEffect(()=>{
    console.log(`/movies/${movie.director!.slug}/${movie.poster}`)
  },[])
  return (
   <Container>
    <Flex>
        <Box width={'25%'} >
       <Flex gap={'2'} direction={'column'} >
       <Image
          width={400}
          height={400}
          style={{ width: 400, height: 400, objectFit: "cover" }}
          alt={movie.title}
          src={`/movies/${movie.director!.slug}/${movie.poster}.jpg`}
        />
        {/* {!bookWithWriters.min_price?<Button  variant="solid"><Link className="cursor-pointer text-white"  href={`${bookWithWriters.pdf_url}`}> Download</Link></Button>:null} */}
       </Flex>
        </Box>
        <Box  width={'75%'} className="p-5 ">
          <Flex direction="column">
            <Heading className="">{movie.title}</Heading>
            <p>{movie.summary}</p>
            {/* <Text className="text-justify">{bookWithWriters.summary}</Text> */}
            {/* <TextWithLinks books={books} description={bookWithWriters.summary} writers={writers}  /> */}
          </Flex>
        </Box>
    </Flex>
    <Seprator/>
   </Container>
  )
}

export default MovieProfile