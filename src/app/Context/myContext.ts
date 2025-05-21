import React, { createContext } from "react";
interface MyContextType {
    value:string;
    setValue:React.Dispatch<React.SetStateAction<string>>
}

export const MyContext= createContext<MyContextType|undefined>(undefined)