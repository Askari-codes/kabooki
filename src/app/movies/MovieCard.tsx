import { Box, Flex, AspectRatio, Text, Badge } from "@radix-ui/themes";
import Link from "next/link";
import React, { useEffect } from "react";
import Image from "next/image";
import { Director, Movie } from "@prisma/client";
import StarRating from "../components/StarRating";

interface Props {
  movie: Movie
  director:Director
}

const MovieCard = ({ movie,director }: Props) => {
 

  return (
    <Flex
      direction={"column"}
      justify={"between"}
      height={"500px"}
      width={"100%"}
    >
      <AspectRatio className="h-[300px] " ratio={8 / 12}>
        <Flex direction={'column'} gap={'1'}>
          <Badge className=" " size={"3"}>
            <Flex className="w-[100%] " justify={"center"}>
              <Text className=""></Text>
              <div className="">
                <StarRating rating={movie.rating} />
              </div>
            </Flex>
          </Badge>
          <Image
            width={300}
            height={200}
            src={`/movies/${director.slug}/${movie.poster}.jpg`}
            alt={movie.title}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              borderRadius: "var(--radius-2)",
            }}
          />
        </Flex>
      </AspectRatio>
      <Text className="h-[100px] flex justify-center items-baseline text-[1.5rem]">
        <Link href={`/movies/${movie.id}`}>{movie.title}</Link>
      </Text>
      
    </Flex>
  );
};

export default MovieCard;
