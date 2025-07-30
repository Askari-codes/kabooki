import { Container } from '@radix-ui/themes';
import React from 'react'

const Books = async() => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/books`,
        {
          cache: "no-cache",
        }
      );
      const books = await response.json();
  return (
   <Container>
    
   </Container>
  )
}

export default Books