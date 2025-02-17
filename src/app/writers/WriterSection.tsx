import { WriterWithBooks } from "../../../models/models";
import WriterCarousel from "./WriterCarousel"


const WriterSection = async() => {
   const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/writers/`,
    {
      cache: "no-cache",
    });
   const writers:WriterWithBooks[] = await response.json()
   

  return (
  
    <WriterCarousel writers={writers}/>
  
  )
}

export default WriterSection