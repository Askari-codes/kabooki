import { Writer } from "@prisma/client";
import WriterCarousel from "./WriterCarousel"

interface Props {
  writers:Writer[]
}

const WriterSection = async({writers}:Props) => {
  //  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/writers/`,
  //   {
  //     cache: "no-cache",
  //   });
  //  const writers:Writer[] = await response.json()
   


  return (
  
    
     <WriterCarousel writers={writers}/>
  
  )
}

export default WriterSection