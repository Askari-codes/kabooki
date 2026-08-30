"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BookmarkIcon, MagnifyingGlassIcon, PersonIcon, VideoIcon } from "@radix-ui/react-icons";
import HeroMenu from "./HeroMenu";
import BookCoverRain from "./BookCoverRain";

const moodFilters = [
  { name: "Books", icon: BookmarkIcon, href: "/books" },
  { name: "Movies", icon: VideoIcon, href: "/movies" },
  { name: "People", icon: PersonIcon, href: "/writers" },
];

const HeroLanding = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [rainPaused, setRainPaused] = useState(false);

  // <html> has global p-4 padding (see layout.tsx) that isn't itself height-
  // constrained, so its box grows past the viewport by that padding even
  // when this section fits exactly. Lock scrolling only while this page is
  // mounted; other routes should still scroll normally.
  useEffect(() => {
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previousOverflow;
    };
  }, []);

  const handleSearch = () => {
    if (query.trim().length > 0) {
      router.push(`/searchResult?query=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="relative flex h-[calc(100vh_-_2rem)] flex-col overflow-hidden bg-[#0f0d0a] text-[#f5efe2]">
      <BookCoverRain paused={rainPaused} onToggle={() => setRainPaused((p) => !p)} />

      <div className="relative z-10">
        <HeroMenu />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-6 pb-24 text-center">
        <h1 className="font-serif text-5xl italic text-[#f5efe2] sm:text-6xl">
          Find your next story.
        </h1>

        <div className="mt-10 w-full">
          <div className="flex items-center gap-3 rounded-full border border-[#c9a45e]/50 bg-black/20 px-5 py-3">
            <MagnifyingGlassIcon className="h-5 w-5 shrink-0 text-[#a08d6e]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              onFocus={() => setRainPaused(true)}
              placeholder="What are you in the mood for?"
              className="w-full bg-transparent text-sm text-[#f5efe2] placeholder:text-[#a08d6e] focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {moodFilters.map(({ name, icon: Icon, href }) => (
            <Link
              key={name}
              href={href}
              className="flex items-center gap-2 rounded-full border border-[#c9a45e]/50 px-5 py-2 text-sm text-[#e8ddc8] transition-colors hover:bg-[#c9a45e]/10"
            >
              <Icon className="h-4 w-4 text-[#c9a45e]" />
              {name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroLanding;
