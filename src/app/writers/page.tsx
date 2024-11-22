import { Writer } from "@prisma/client";
import axios from "axios";


const Writers = async () => {
  let writers:Writer[]=[]
  try {
    const response = await axios.get<Writer[]>(`${process.env.Base_URL}/api/writers`);
     writers = response.data;
  } catch (error) {
    console.error("Error fetching writers:", error);
  }
  return (
    <div>
      <div>{writers.map((writer)=>(
        <div key={writer.id}>
          {writer.name} {writer.last_name} 
        </div>
      ))}</div>
    </div>
  );
};

export default Writers;
