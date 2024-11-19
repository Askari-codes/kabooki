import MySection from "./Section"
import axios from "axios";
import { Writer } from "@prisma/client";



const ContentSection = async() => {
    console.log(`${process.env.BASE_URL}/apir/writers`);

    const response = await axios.get<Writer[]>(`${process.env.BASE_URL}/api/writers`)
    const writers:Writer[] = response.data
  return (
  <MySection writers={writers}/>
  )
}

export default ContentSection
