import { Writer } from "@prisma/client";
import WriterCarousel from "./WriterCarousel"

interface Props {
  writers:Writer[]
}

const WriterSection = async({writers}:Props) => {

  return (
  
    
     <WriterCarousel writers={writers}/>
  
  )
}

export default WriterSection