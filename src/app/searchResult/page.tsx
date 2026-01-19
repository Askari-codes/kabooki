import axios from "axios";
import SearchResult from "./SearchResult";

interface ResolvedSearchParams {
  query?: string  
  
}

interface SearchResultProps {
  searchParams: Promise<ResolvedSearchParams>;
}

const SearchResultWrapper = async ({ searchParams }: SearchResultProps) => {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.query;

  let searchResultData: any = null; 
  const fetchSearchData = async (searchQuery: string) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/search`,
        { query: searchQuery }
      );
      return res.data;
    } catch (error) {
      console.error("Search failed:", error);
      return null;
    }
  };

  if (query) {
    searchResultData = await fetchSearchData(query);
  }

 

  return (
    <SearchResult searchResult={searchResultData}/>
  );
};

export default SearchResultWrapper;
