import { Container, Grid } from "@radix-ui/themes";
import FavoriteBooksOrbit from "./FavoriteBooksOrbit";
import UserProfileHeader from "./UserProfileHeader";
import UserInfo from "./UserInfo";

const favoriteBooks = [
  { title: "Hamlet", image: "/books/Hamlet.jpg" },
  { title: "Macbeth", image: "/books/Macbeth.jpg" },
  { title: "Othello", image: "/books/Othello.jpg" },
  { title: "King Lear", image: "/books/King-Lear.jpg" },
  { title: "Romeo and Juliet", image: "/books/Romeo-and-Juliet.jpg" },
];

const UsersPage = async () => {
  const [books, writers, movies] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books?limit=500`, { cache: "no-cache" }).then((r) => r.json()),
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/writers`, { cache: "no-cache" }).then((r) => r.json()),
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies`, { cache: "no-cache" }).then((r) => r.json()),
  ]);

  return (
    <Container size="4" className="bg-[#faf6ee] py-10">
      <Grid columns="60% 40%" gap="8" align="start">
        <FavoriteBooksOrbit
          avatarSrc="/users/Mohammad_askari.jpg"
          avatarAlt="Mohammad Askari"
          books={favoriteBooks}
        />
        <Grid rows="auto 1fr" gap="4" className="h-[600px]">
          <UserProfileHeader
            name="Mohammad Askari"
            username="@mohammad.askari"
            avatarSrc="/users/Mohammad_askari.jpg"
            location="Tehran, Iran"
            joinedAt="2024-01-15T00:00:00Z"
            followersCount={128}
            followingCount={54}
          />
          <UserInfo
            about="I read mostly tragedies and Latin American fiction. Leaf Storm is what got me hooked on Gabriel Garcia Marquez, and I still reread Mario Vargas Llosa whenever I need to be reminded why I love this stuff."
            sharing="Book reviews, favorite quotes, and the occasional film I think pairs well with what I'm reading, like The Godfather."
            books={books}
            writers={writers}
            movies={movies}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default UsersPage;
