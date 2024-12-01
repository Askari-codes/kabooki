"use client";
import Image from "next/image";
import "swiper/css";
import { CustomerSwiperSlideProps } from "../../../models/models";
import { Box, Card, Inset, Text } from "@radix-ui/themes";
import Link from "next/link";

const SwiperContent = ({ book, writer }: CustomerSwiperSlideProps) => {
  
  if (book) {
    return (
      <div
        key={book?.id}
        style={{
          border: "1px solid lightgray",
          borderRadius: "10px",
          padding: "1rem",
          textAlign: "center",
          backgroundColor: "#f9f9f9",
        }}
      >
        <Image
          src={"/books/Dora Bruder.jpg"}
          alt={book?.title || ""}
          width={150}
          height={200}
          style={{
            objectFit: "cover",
            borderRadius: "10px",
            marginBottom: "1rem",
          }}
        />
        <h3 style={{ margin: "0.5rem 0", fontSize: "1.2rem" }}><Link href={`/books/${book.id}`}>{book?.title}</Link></h3>
        <p style={{ margin: "0.5rem 0", color: "gray" }}>{book?.genre?.name}</p>
        <p style={{ fontSize: "0.9rem", color: "#555", marginBottom: "0.5rem" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "0.2rem" }}>
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              style={{
                color: index < book?.rating ? "gold" : "lightgray",
                fontSize: "1rem",
              }}
            >
              ★
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (writer) {
    return (
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          size="2"
          style={{
            maxWidth: "300px",
            height: "350px",
            textAlign: "center",
            border: "1px solid var(--gray-300)",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Inset
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <Image
              src={`/writers/${writer.picture_url}.jpg`} // Fixed path
              alt={writer.name || "Writer"}
              width={120}
              height={160}
              style={{
                objectFit: "cover",
                borderRadius: "8px",
                border: "1px solid var(--gray-300)",
              }}
            />
          </Inset>
          <Text
            as="p"
            size="3"
            style={{
              fontWeight: "bold",
              margin: "10px 0",
            }}
          >
            <Link href={`/writers/${writer.id}`}>{writer.name || "Unknown Title"}</Link>
          </Text>
          <Text
            as="p"
            size="2"
            style={{
              color: "var(--gray-600)",
              fontSize: "0.9rem",
              lineHeight: "1.4",
            }}
          >
            <Link href={`/writers/${writer?.id}`}>
              by {writer?.name} {writer?.last_name}
            </Link>
          </Text>
          <Text
            as="p"
            size="2"
            style={{
              color: "var(--gray-500)",
              fontSize: "0.8rem",
              marginTop: "10px",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Text>
        </Card>
      </Box>
    );
  }

  // Fallback for when neither book nor writer is provided
  return <div>No content available</div>;
};

export default SwiperContent;
