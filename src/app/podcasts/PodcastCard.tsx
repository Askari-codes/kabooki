import React, { useEffect } from 'react'
import { PodcastWithHost } from '../../../models/models'
import { Box, Flex, AspectRatio,Text } from '@radix-ui/themes'
import Link from 'next/link'
import StarRating from '../components/StarRating'
import Image from "next/image";

interface Props{
    podcast:PodcastWithHost
}

const PodcastCard = ({podcast}:Props) => {
  useEffect(() => {
    console.log(podcast.cover_url,podcast.slug);
    
  }, []);
  return (
    <div>
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
            src={

          `/podcasts/${podcast.cover_url}.jpg `
            }
            alt={podcast.title}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              borderRadius: "var(--radius-2)",
            }}
          />
        </AspectRatio>
        <Text size={"6"}  className="mt-2" weight="medium">
          <Link href={`books/${podcast.slug}`}>{podcast.title}</Link>
        </Text>
        <Box>
          <StarRating rating={podcast.rating} />
        </Box>
        <Text weight='medium' >
          {podcast.min_price===0.00?'Free':`from $${podcast.min_price}`}
        </Text>
      </Flex>
    </Box>
  
    </div>
  )
}

export default PodcastCard
