import MySection from "./WriterCarousel"
import axios from "axios";
import { Writer } from "@prisma/client";



const WriterSection = async() => {
    console.log(`${process.env.BASE_URL}/apir/writers`);

    const response = await axios.get<Writer[]>(`${process.env.BASE_URL}/api/writers`)
    const writers:Writer[] = response.data
  return (
  <MySection writers={writers}/>
  )
}

export default WriterSection