
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import * as Separator from "@radix-ui/react-separator";
import prisma from "../../../../prisma/client";



interface Props {
  params: { id: string };
}


const WriterProfile = async ({ params }: Props) => {
  const writer = await prisma.writer.findUnique({
    where:{id:parseInt(params.id)}
  })
  

  if (!writer) {
    return <p>Writer not found</p>;
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Avatar>
          <AvatarImage
            src={
              "/writers/" + writer.picture_url + ".jpg" ||
              "/writers/" + writer.picture_url + "jpeg" ||
              undefined
            }
            alt={writer.name}
            style={{ width: "200px", height: "200px", borderRadius: "10%" }}
          />
          <AvatarFallback>{writer.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h1 style={{ margin: 0, fontSize: "1.5rem" }}>{writer.name}</h1>
          <p style={{ margin: "0.5rem 0", color: "gray" }}>
            {writer.description}
          </p>
        </div>
      </div>
      <Separator.Root
        style={{
          margin: "1.5rem 0",
          backgroundColor: "lightgray",
          height: "1px",
        }}
      />
      
    </div>
  );
};

export default WriterProfile;
