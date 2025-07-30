import React from 'react'
import MovieSection from './MovieSection'
import { Container } from '@radix-ui/themes'
import { Movie } from '@prisma/client'

const page = async()  => {
  const moviesResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies`,
    {
      cache:"no-cache"
    }
  )
    const movies:Movie[] =await moviesResponse.json()
  return (
<Container>

</Container>
)
}

export default page 