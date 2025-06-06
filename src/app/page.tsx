import { Container } from "@radix-ui/themes";
import WriterSection from "./writers/WriterSection";
import MovieSection from "./movies/MovieSection";
import { Writer } from "@prisma/client";
import NavbarWrapper from "./navigation/NavbarWrapper";

export default async function Home() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/writers/`,
    {
      cache: "no-cache",
    }
  );
  const writers: Writer[] = await response.json();
  return (
    <Container>
      <NavbarWrapper />
      <WriterSection writers={writers} />
      <MovieSection />
    </Container>
  );
}
