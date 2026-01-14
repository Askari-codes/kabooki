"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import type { Book, Writer } from "@prisma/client";

type LinkMap = Record<string, string>;

interface TextWithLinksProps {
  books: Book[];
  writers: Writer[];
  description: string | null;
}

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const buildRegex = (keys: string[]) => {
  const sorted = [...keys].sort((a, b) => b.length - a.length); // longest first
  const pattern = sorted.map(escapeRegex).join("|");
  if (!pattern) return null;

  // Group 1 = prefix, Group 2 = match
  return new RegExp(`(^|[^\\p{L}\\p{N}_])(${pattern})(?=[^\\p{L}\\p{N}_]|$)`, "gu");
};

export default function TextWithLinks({ books, writers, description }: TextWithLinksProps) {
  useEffect(()=>{
    console.log("writers prop:", writers.map(w => `${w.name} ${w.last_name}`));
  },[])
  const links: LinkMap = React.useMemo(() => {
    const map: LinkMap = {};
    for (const b of books) map[b.title] = `/books/${b.id}`;

    for (const w of writers) {
      const fullName = `${w.name} ${w.last_name}`; // <-- your fields
      map[fullName] = `/writers/${w.id}`;
    }

    return map;
  }, [books, writers]);

  const regex = React.useMemo(() => buildRegex(Object.keys(links)), [links]);

  const nodes = React.useMemo(() => {
    if (!description) return [];
    if (!regex) return [description];

    const out: React.ReactNode[] = [];
    let lastIndex = 0;

    // IMPORTANT: reset in case regex is reused
    regex.lastIndex = 0;

    let match: RegExpExecArray | null;
    while ((match = regex.exec(description)) !== null) {
      const prefix = match[1] ?? "";
      const text = match[2]; // the actual matched book title / writer full name

      const start = match.index;
      const prefixStart = start;                 // where prefix begins
      const textStart = start + prefix.length;   // where the matched text begins

      // plain text before this match
      if (prefixStart > lastIndex) {
        out.push(<span key={`t-${lastIndex}`}>{description.slice(lastIndex, prefixStart)}</span>);
      }

      // the prefix itself (space/punctuation)
      if (prefix) {
        out.push(<span key={`p-${prefixStart}`}>{prefix}</span>);
      }

      // the matched phrase as a Link
      out.push(
        <Link
          key={`l-${textStart}`}
          href={links[text]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 font-medium"
        >
          {text}
        </Link>
      );

      lastIndex = textStart + text.length;
    }

    // remaining tail text
    if (lastIndex < description.length) {
      out.push(<span key={`t-end`}>{description.slice(lastIndex)}</span>);
    }

    return out;
  }, [description, regex, links]);

  return <div className="text-justify text-[17px] font-serif">{nodes}</div>;
}
