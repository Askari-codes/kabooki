import { Section } from '@radix-ui/themes'
import React from 'react'
import { FavoritePodcast } from '../../../../models/models'
import FavoritePodcastSwiper from './FavoritePodcasSwiper'


interface Props {
    favoritePodcasts:FavoritePodcast[]
}

const FavoriePodcastCarousel = ({favoritePodcasts}:Props) => {
    return (
        <Section style={{ padding: "20px 0" }}>
          <h2 style={{ marginBottom: "20px", fontSize: "1.5rem", fontWeight:'bold', paddingLeft:'1rem' }}>Favorite Podcasts</h2>
          <FavoritePodcastSwiper favoritePodcasts={favoritePodcasts}/>
        </Section>
      )
}

export default FavoriePodcastCarousel
