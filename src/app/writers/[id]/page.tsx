import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import * as Separator from "@radix-ui/react-separator";
import SelectedBooks from "./SelectedBooks";


interface Props {
  params: { id: string };
}


const WriterProfile = async ({ params }: Props) => {
  const response = await axios.get(
    `${process.env.Base_URL}/api/writers/${params.id}`
  );
  const writer = response.data;

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
      <SelectedBooks writer={writer}/>
    </div>
  );
};

export default WriterProfile;
