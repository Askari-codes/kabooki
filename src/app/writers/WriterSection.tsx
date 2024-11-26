import WriterCarousel from "./WriterCarousel"
import { Writer } from "@prisma/client";




const WriterSection = async() => {
   const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/writers`);
   const writers:Writer[] = await response.json()
  return (
  
    <WriterCarousel writers={writers}/>
  
  )
}

export default WriterSection