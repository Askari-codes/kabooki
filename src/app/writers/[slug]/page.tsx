
import CustomSwiper from "@/app/components/swiper/CustomSwiper";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import * as Separator from "@radix-ui/react-separator";
import axios from "axios";
import Image from "next/image";
import { BookWithWriter, WriterWithBooks } from "../../../../models/models";

interface Props {
  params: { slug: string };
}


const WriterProfile = async ({ params }: Props) => {
  
  const slug = params.slug
  
  
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/writers/${slug}`)
  const writer:WriterWithBooks=response.data
 
  console.log(writer);
  
  const bestBooks:BookWithWriter[]= writer.books?.filter((book)=>{
   return book.rating===5
  })
 console.log(bestBooks);
 
  
  
  if (!writer) {
    return <p>Writer not found</p>;
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      {/* Writer Profile Section */}
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

      {/* Separator */}
      <Separator.Root
        style={{
          margin: "1.5rem 0",
          backgroundColor: "lightgray",
          height: "1px",
        }}
      />

      {/* Known Books Section */}
      <div>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
          Best Known Books
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
          {
            bestBooks?.map(({id,title,rating,picture_url})=>(
              <div
            key={id}
            style={{
              border: "1px solid lightgray",
              borderRadius: "10px",
              padding: "1rem",
              textAlign: "center",
              backgroundColor: "#f9f9f9",
            }}
          >
            {/* Book Image */}
            <Image
              src={`/books/${picture_url}.jpg`||`/books/${picture_url}.jpeg`}
              alt={title}
              width={150}
              height={200}
              style={{ objectFit: "cover", borderRadius: "10px", marginBottom: "1rem" }}
            />
            {/* Book Title */}
            <h3 style={{ margin: "0.5rem 0", fontSize: "1.2rem" }}>
              {title}
            </h3>
            {/* Book Genre */}
            {/* <p style={{ margin: "0.5rem 0", color: "gray" }}>{genre.name}</p> */}
            {/* Book Description */}
            <p style={{ fontSize: "0.9rem", color: "#555", marginBottom: "0.5rem" }}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis, et aut rerum doloremque sed dolore aliquam incidunt, exercitationem doloribus velit dolor nemo.
            </p>
            {/* Book Rating (Stars) */}
            <div style={{ display: "flex", justifyContent: "center", gap: "0.2rem" }}>
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  style={{
                    color: index < rating ? "gold" : "lightgray",
                    fontSize: "1rem",
                  }}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
            ))
          }
        </div>
      </div>
      <Separator.Root
       style={{
        margin: "1.5rem 0",
        backgroundColor: "lightgray",
        height: "1px",
      }}
      />
       <CustomSwiper books={writer.books} />
    </div>
  );
};

export default WriterProfile;
