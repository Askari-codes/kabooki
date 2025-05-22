'use client'
import React, { useContext, useEffect } from 'react'
import useSearchContext from '../Context/useSearchContext'
import { MyContext } from '../Context/myContext'

const SearchResult = () => {
  const {result}=useSearchContext()
  useEffect(()=>{
    // console.log('im here',result);
    
  },[result])
  return (
    <div>SearchResult</div>
  )
}

export default SearchResult