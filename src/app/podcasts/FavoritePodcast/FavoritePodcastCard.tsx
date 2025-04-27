import StarRating from '@/app/components/StarRating'
import { Box, Flex, AspectRatio, Tooltip, Dialog,Text } from '@radix-ui/themes'
import Link from 'next/link'
import Image from 'next/image';
import React from 'react'
import { FavoritePodcast } from '../../../../models/models';

interface Props {
    favoritePodcast:FavoritePodcast
}

const FavoritePodcastCard = ({favoritePodcast}:Props) => {
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
                src={`/movies/${favoritePodcast.podcast.cover_url}.jpeg`}
                alt={favoritePodcast.podcast.title}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  borderRadius: "var(--radius-2)",
                }}
              />
              {/* style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} */}
            </AspectRatio>
            <Box className='w-[250px] mt-2 overflow-hidden text-ellipsis whitespace-nowrap ' > {/* Ensure this height fits two lines of text */}
              <Tooltip  content={favoritePodcast.podcast.title}>
              <Text size={"6"} className="mt-2 " weight="medium"  >
                <Link href={`books/${favoritePodcast.podcast.slug}`}>
                  {favoritePodcast.podcast.title}
                </Link>
                
              </Text>
              </Tooltip>
            </Box>
            <Box>
              <StarRating rating={favoritePodcast.rating} />
            </Box>
            <Dialog.Root>
              <Dialog.Trigger>
                <Text className="cursor-pointer">Comment</Text>
              </Dialog.Trigger>
              <Dialog.Content>
                {favoritePodcast.comment}
              </Dialog.Content>
            </Dialog.Root>
          </Flex>
        </Box>
      )
}

export default FavoritePodcastCard
