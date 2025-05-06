import React from "react";
import { AspectRatio, Box, Flex, Text } from "@radix-ui/themes";
import { Writer } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface WriterCardProps {
  writer: Writer;
}

const WriterCard: React.FC<WriterCardProps> = ({ writer }) => {
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
            src={
              `/writers/${writer.picture_url}`
            }
            width={300}
            height={200}
            alt={writer.name +" "+writer.last_name}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              borderRadius: "var(--radius-2)",
            }}
          />
        </AspectRatio>
        <Text  size={"6"} align={"center"} className="mt-2" weight="medium" >
          <Link href={`writers/${writer.slug}`} >
          {writer.name + " " + writer.last_name}
          </Link>
        </Text>
      </Flex>
    </Box>
  );
};

export default WriterCard;
