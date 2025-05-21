import React,{useContext} from 'react'
import { MyContext } from './myContext';

const useSearchContext = () => {
    const context = useContext(MyContext);
    if (!context) {
      throw new Error('useMyContext must be used within a MyProvider');
    }
    return context;
}

export default useSearchContext