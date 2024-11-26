import { Genre } from "@prisma/client";
import GenreCraousel from "./GenreCraousel";

const GenresSection = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/genres`
  );
  const genres: Genre[] = await response.json();
  if (!genres) return <div>loading ...</div>;

  return <GenreCraousel genres={genres} />;
};

export default GenresSection;
