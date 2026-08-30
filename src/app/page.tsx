
import {  Movie, Writer } from "@prisma/client";
import HeroLanding from "./HeroLanding";
import { safeFetchJson } from "./utilities/services";

export default async function Home() {
  const writers = await safeFetchJson<Writer>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/writers/`);
  const movies = await safeFetchJson<Movie>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies`);

  
  
  return (
    <>
      <HeroLanding />
     
    </>
  );
}
