"use client";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Container } from "@radix-ui/themes";

export const dynamic = "force-dynamic";

const NavbarWrapper = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isRequest, setIsRequest] = useState<boolean>(false);

  const searchValueHandler = (arg: string) => {
    setSearchValue(arg);
  };
  const requestHandler = (bool: boolean) => {
   setIsRequest(bool)
  };
  useEffect(()=>{
    setIsRequest(true)
    
  },[isRequest])

  useEffect(()=>{
        console.log('isRequest',searchValue);
        
  },[isRequest,searchValue])
  
  const x = async () => {};
  return (
    <Container>
      <Navbar
        searchHandler={searchValueHandler}
        requestHandler={requestHandler}
      />
    </Container>
  );
};

export default NavbarWrapper;
