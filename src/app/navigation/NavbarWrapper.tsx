"use client";
import React from "react";
import Navbar from "./Navbar";
import SearchProvider from "../Context/searchProvider";

const NavbarWrapper = () => {
  return (
    <SearchProvider>
      <Navbar />
    </SearchProvider>
  );
};

export default NavbarWrapper;
