import { ReactNode } from "react";
import { Box, Flex, Text } from "@radix-ui/themes";
import type { Book, Movie, Writer } from "@prisma/client";
import TextWithLinks from "../components/TextWithLinks";

interface Props {
  about: string;
  sharing: string;
  books: Book[];
  writers: Writer[];
  movies: Movie[];
}

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <Box>
    <Text as="div" size="2" weight="bold" className="mb-2 uppercase tracking-wide text-[#a08d6e]">
      {title}
    </Text>
    {children}
  </Box>
);

const UserInfo = ({ about, sharing, books, writers, movies }: Props) => {
  return (
    <Box className="rounded-2xl bg-white p-6 text-[#2f2418] shadow-sm">
      <Flex direction="column" gap="4">
        <Section title="About">
          <TextWithLinks
            books={books}
            writers={writers}
            movies={movies}
            description={about}
            linkClassName="text-[#7c4a24] font-semibold underline decoration-[#e8dfd0] underline-offset-2 hover:text-[#5c3418]"
          />
        </Section>

        <Section title="What I Share">
          <TextWithLinks
            books={books}
            writers={writers}
            movies={movies}
            description={sharing}
            linkClassName="text-[#7c4a24] font-semibold underline decoration-[#e8dfd0] underline-offset-2 hover:text-[#5c3418]"
          />
        </Section>
      </Flex>
    </Box>
  );
};

export default UserInfo;
