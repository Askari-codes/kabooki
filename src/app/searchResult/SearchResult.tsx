'use client'
import React from 'react'
import { Container } from '@radix-ui/themes'
import { SearchModel } from '../../../prisma/model'
import BookSection from '../books/BookSection'
import MovieSection from '../movies/MovieSection'
import WriterSection from '../writers/WriterSection'

interface Props{
    searchResult:SearchModel
}

const SearchResult = ({searchResult}:Props) => {
  const {writers,books,movies,directors}=searchResult
 
  
    
    const isDataExist:boolean|undefined = 
    (searchResult.books && searchResult.books.length > 0) ||
    (searchResult.writers && searchResult.writers.length > 0) ||
    (searchResult.directors && searchResult.directors.length > 0) ||
    (searchResult.movies && searchResult.movies.length > 0);
  return (
    <Container>
        {!isDataExist?(
        <div>Nothing find</div>)
        :(
          <>
          {writers&&writers.length> 0 ?(<WriterSection writers={writers}/>):null}
          {movies&&movies.length>0?(<MovieSection movies={movies} />):null}
          {books&&books.length>0?(<BookSection/>):null}
          </>
        )
        }
    </Container>
  )
}

export default SearchResult