import { Box, Flex, AspectRatio,Text } from '@radix-ui/themes'
import Link from 'next/link'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { Movie } from '@prisma/client'
import StarRating from '../components/StarRating'
import { log } from 'console'

interface Props{
    movie:Movie
}

const MovieCard = ({movie}:Props) => {
    useEffect(()=>{
      console.log('movie poster',movie)
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
          <Image
            width={300}
            height={200}
            src={`/movies/${movie.poster}.jpg`}
            alt={movie.title}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              borderRadius: "var(--radius-2)",
            }}
          />
        </AspectRatio>
        <Text size={"6"}  className="mt-2" weight="medium">
          <Link href={`/movies/${movie.id}`}>{movie.title}</Link>
        </Text>
        <Box>
          <StarRating rating={movie.rating} />
        </Box>
        
      </Flex>
    </Box>
  )
}

export default MovieCard
