import React from 'react'
import PodcatCarousel from './PodcatCarousel'

const PadcastSection = async() => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/podcasts`,
        {
            cache:'no-cache'
        }
    )
    const podcasts = await response.json()
  return (
    <PodcatCarousel title='podcasts' podcasts={podcasts}/>
  )
}

export default PadcastSection
