import { Writer } from "@prisma/client";

const Writers = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/writers`);
    const writers:Writer[] = await response.json();
  
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
