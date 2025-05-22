'use client'
import React from "react";
import SearchResult from "./SearchResult";
import SearchProvider from "../Context/searchProvider";

const SearchResultWrapper = () => {
  return (
    <SearchProvider>
      <SearchResult />
    </SearchProvider>
  );
};

export default SearchResultWrapper;
