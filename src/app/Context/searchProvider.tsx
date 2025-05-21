import React, { ReactNode ,use,useState} from "react";
import { MyContext } from "./myContext";

interface MyproviderProps{
    children:ReactNode
}

export const SearchProvider = ({children}:MyproviderProps)=>{

    const [value,setValue] = useState<string>('hiii')



return(
    <MyContext.Provider value={{value,setValue}}>
        {children}
    </MyContext.Provider>
)
   

}

export default SearchProvider