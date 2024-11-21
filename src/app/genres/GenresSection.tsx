import React from 'react'
import { Genre } from '@prisma/client';
import axios from 'axios';
import GenreCraousel from './GenreCraousel';

const GenresSection = async() => {
    const response = await axios.get<Genre[]>(`${process.env.BASE_URL}/api/genres`);
  
    const genres: Genre[] = response.data;
    console.log(genres);
    
    
  
    return <GenreCraousel genres={genres} />;
}

export default GenresSection
