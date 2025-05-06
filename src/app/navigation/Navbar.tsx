import React from "react";
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
        </NavigationMenuList>
      </NavigationMenu>
      <TextField.Root placeholder="search a book or witer..." size={"2"} className="mt-4" variant="classic">
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>
    </Container>
  );
};

export default Navbar;
