import axios from "axios";

interface ResolvedSearchParams {
  query?: string  
  
}

interface SearchResultProps {
  searchParams: Promise<ResolvedSearchParams>;
}

const SearchResult = async ({ searchParams }: SearchResultProps) => {
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

  console.log('Received query in SearchResult:', query);
  console.log('Fetched searchResultData:', searchResultData);

  return <div>search result</div>;
};

export default SearchResult;
