import { Box, Container, Flex } from "@radix-ui/themes";
import FavoriteBooksOrbit from "./FavoriteBooksOrbit";
import UserProfileHeader from "./UserProfileHeader";

const favoriteBooks = [
  { title: "Hamlet", image: "/books/Hamlet.jpg" },
  { title: "Macbeth", image: "/books/Macbeth.jpg" },
  { title: "Othello", image: "/books/Othello.jpg" },
  { title: "King Lear", image: "/books/King-Lear.jpg" },
  { title: "Romeo and Juliet", image: "/books/Romeo-and-Juliet.jpg" },
];

const UsersPage = async () => {
  return (
    <Container size="4" className="py-10">
      <Flex gap="8" align="start" wrap="wrap">
        <FavoriteBooksOrbit
          avatarSrc="/users/Mohammad_askari.jpg"
          avatarAlt="Mohammad Askari"
          books={favoriteBooks}
        />
        <Box className="flex-1 min-w-[280px] pt-2">
          <UserProfileHeader name="Mohammad Askari" username="@mohammad.askari" />
        </Box>
      </Flex>
    </Container>
  );
};

export default UsersPage;
