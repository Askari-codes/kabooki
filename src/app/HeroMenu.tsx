import Link from "next/link";
import { AvatarIcon, BookmarkIcon } from "@radix-ui/react-icons";

const navLinks = [
  { name: "Movies", href: "/movies" },
  { name: "Books", href: "/books" },
  { name: "Discover", href: "#" },
  { name: "Community", href: "#" },
];

const HeroMenu = () => {
  return (
    <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-8 py-6">
      <Link href="/" className="flex items-center gap-2">
        <BookmarkIcon className="h-5 w-5 text-[#c9a45e]" />
        <span className="text-sm font-semibold tracking-[0.2em] text-[#f5efe2]">
          KABOOKI
        </span>
      </Link>

      <div className="hidden items-center gap-10 md:flex">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="text-sm text-[#e8ddc8] transition-colors hover:text-[#c9a45e]"
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-6">
        <Link href="/user" className="hidden text-sm text-[#e8ddc8] hover:text-[#c9a45e] sm:block">
          My Lists
        </Link>
        <Link href="/user" className="hidden text-sm text-[#e8ddc8] hover:text-[#c9a45e] sm:block">
          Profile
        </Link>
        <Link
          href="/login"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c9a45e]/60 text-[#c9a45e] transition-colors hover:bg-[#c9a45e]/10"
        >
          <AvatarIcon className="h-5 w-5" />
        </Link>
      </div>
    </nav>
  );
};

export default HeroMenu;
