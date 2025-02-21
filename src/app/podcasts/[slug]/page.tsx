import { Box, Card, Heading, Separator,Text } from '@radix-ui/themes'
import axios from 'axios';
import Image from "next/image";
import React from 'react'
import { PodcastWithHost } from '../../../../models/models';
import NotFound from './not-found';

interface Props{
    params:{slug:string}
}

const PadcastProfile = async({params}:Props) => {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/podcasts/${params.slug}`
      );
      const podcast: PodcastWithHost = response.data;
    
      if (!podcast) return NotFound();
  return (
    <Box
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Card
        size="3"
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "flex-start",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box>
          <Image
            src={"/something"} // Default image if picture_url is null
            alt={podcast.title}
            width={200}
            height={300}
            style={{
              objectFit: "cover",
              borderRadius: "8px",
              border: "1px solid var(--gray-300)",
            }}
          />
        </Box>
        <Box
          style={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Heading as="h2" size="4" style={{ margin: 0 }}>
            {podcast?.title}
          </Heading>

          <Text as="p" size="3" style={{ color: "var(--gray-700)" }}>
            By: {podcast.host?.name} {podcast.host?.last_name}
          </Text>

          {/* <Text as="p" size="2" style={{ color: "var(--gray-600)" }}>
            Genre: {book.genre.name}
          </Text> */}

          <Text as="p" size="2" style={{ color: "var(--gray-600)" }}>
            Published: {podcast.rating}
          </Text>
        </Box>
      </Card>

      <Box>
        <Heading as="h3" size="3" style={{ marginBottom: "10px" }}>
          Description
        </Heading>
        <Separator />
        <Text
          as="p"
          size="2"
          style={{ color: "var(--gray-700)", lineHeight: "1.6" }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit
          amet accumsan tortor. Morbi hendrerit sapien ut est fringilla, nec
          fringilla magna pellentesque. Praesent id nisi eget metus blandit
          mollis a at erat.
        </Text>
      </Box>
    </Box>
  )
}

export default PadcastProfile
