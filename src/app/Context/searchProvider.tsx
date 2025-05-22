import React, { ReactNode ,use,useState} from "react";
import { MyContext } from "./myContext";
import { Movie, Writer, Director, Book } from "@prisma/client";
import { SearchResult } from "./myContext";

interface MyproviderProps{
    children:ReactNode
}

export const SearchProvider = ({children}:MyproviderProps)=>{

    const [result,setResult] = useState<SearchResult|undefined>(undefined)



return(
    <MyContext.Provider value={{result,setResult}}>
        {children}
    </MyContext.Provider>
)
   

}

export default SearchProvider