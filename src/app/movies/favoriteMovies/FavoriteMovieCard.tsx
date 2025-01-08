import React from 'react';
import { FavoriteMovie } from '../../../../models/models';
import StarRating from '@/app/components/StarRating';
import { Box, Flex, AspectRatio, Dialog, Text, Tooltip } from '@radix-ui/themes';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
    favoriteMovie: FavoriteMovie;
}

const FavoriteMovieCard = ({ favoriteMovie }: Props) => {
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
            src={`/movies/${favoriteMovie.movie.poster}.jpeg`}
            alt={favoriteMovie.movie.title}
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
          <Tooltip  content={favoriteMovie.movie.title}>
          <Text size={"6"} className="mt-2 " weight="medium"  >
            <Link href={`books/${favoriteMovie.movie.slug}`}>
              {favoriteMovie.movie.title}
            </Link>
            
          </Text>
          </Tooltip>
        </Box>
        <Box>
          <StarRating rating={favoriteMovie.rating} />
        </Box>
        <Dialog.Root>
          <Dialog.Trigger>
            <Text className="cursor-pointer">Comment</Text>
          </Dialog.Trigger>
          <Dialog.Content>
            {favoriteMovie.comment}
          </Dialog.Content>
        </Dialog.Root>
      </Flex>
    </Box>
  )
}

export default FavoriteMovieCard;
