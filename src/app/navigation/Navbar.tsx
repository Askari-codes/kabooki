"use client";
import React, { useEffect, useState} from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@radix-ui/react-navigation-menu";
import { Container, Flex, TextField } from "@radix-ui/themes";
import Link from "next/link";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useRouter } from 'next/navigation';
import useSearchContext from "../Context/useSearchContext";
export const dynamic = "force-dynamic";

const navigationLinks = [
  {
    name: "Login",
    href: "/login",
  },
  {
    name: "Writers",
    href: "/writers",
  },
  {
    name: "Movies",
    href: "/movies",
  },
  {
    name: "Books",
    href: "/books",
  },
  {
    name: "Directors",
    href: "/directors",
  },
];

const Navbar = () => {
  const [searchInputValue, setSearchValue] = useState<string>("");
  const router=useRouter()
  const handleSearch = async (query: string) => {
   
    router.push(`/searchResult?query=${encodeURIComponent(query)}`)
  };

  const searchInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    if (/^[a-zA-Z\s]*$/.test(input)) {
      setSearchValue(input);
    }
    return input;
  };
  const searchRequest = async () => {
    if (searchInputValue.length > 3) {
      handleSearch(searchInputValue);
    
    }
  };

 

  return (
    <Container>
      <NavigationMenu>
        <NavigationMenuList>
          <Flex align="center" className="text-[20px] font-semibold">
            {navigationLinks.map((link, index) => (
              <NavigationMenuItem key={index} className="pr-12">
                <NavigationMenuTrigger>
                  <Link href={link.href}>{link.name}</Link>
                </NavigationMenuTrigger>
              </NavigationMenuItem>
            ))}
          </Flex>
          <TextField.Root
            onChange={searchInputHandler}
            placeholder="search a book or witer..."
            size={"2"}
            className="mt-4"
            variant="classic"
            type="text"
            value={searchInputValue ?? ""}
          >
            <TextField.Slot>
              <MagnifyingGlassIcon
                height="16"
                width="16"
                onClick={searchRequest}
              />
            </TextField.Slot>
          </TextField.Root>
        </NavigationMenuList>
      </NavigationMenu>
    </Container>
  );
};

export default Navbar;
