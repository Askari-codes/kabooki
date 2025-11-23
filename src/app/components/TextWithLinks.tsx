import React from "react";
import Link from "next/link";
import { BookWithWriter } from "../../../models/models";

interface BookLinks {
  [title: string]: string;
}
interface TextWithLinksProps {
  books: BookWithWriter[];
  description: string | null;
}

const TextWithLinks: React.FC<TextWithLinksProps> = ({
  books,
  description,
}: TextWithLinksProps) => {
  const bookLinks: BookLinks = books.reduce(
    (acc: BookLinks, book: BookWithWriter) => {
      acc[book.title] = `/books/${book.slug}`;
      return acc;
    },
    {}
  );
  
  const regex = new RegExp(
    `\\b(${Object.keys(bookLinks)
      .map(title => title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|")})\\b`,
    "g"
  );
  const parts = description?.split(regex);
  const renderText = () =>
    parts?.map((part, index) => {
      if (bookLinks[part]) {
        return (
          <Link
            key={index}
            href={bookLinks[part]}
            // style={styles.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-medium font- "
          >
            {part}
          </Link>
        );
      } else {
        return (
          <span key={index} className="inline">
            {part}
          </span>
        );
      }
    });

  return <div className="text-justify text-[17px] font-serif"   >{renderText()}</div>;
};

// Inline styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "row" as "row",
    flexWrap: "wrap" as "wrap",
    textAlign: "justify" as "justify",
  },
  text: {
    fontSize: 16,
    color: "black",
  },
  link: {
    fontSize: 16,
    color: "blue",
    textDecoration: "none",
    display: "inline",
  },
};

export default TextWithLinks;
