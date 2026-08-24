import { Container, Grid } from "@radix-ui/themes";
import OrbitSwitcher from "./OrbitSwitcher";
import UserProfileHeader from "./UserProfileHeader";
import UserInfo from "./UserInfo";
import CategoryCarousels from "./CategoryCarousels";
import { CategoryProvider } from "./CategoryContext";
import StoriesCarousel from "./StoriesCarousel";
import Seprator from "../components/Seprator";
import { safeFetchJson } from "../utilities/services";
import type { Book, Movie, Writer } from "@prisma/client";

// First 5 are shown in the orbit; the rest go in the carousel below it, so
// the two never show the same book.
const favoriteBooksPool = [
  { title: "The Feast of the Goat", image: "/books/Mario-Vargas-Llosa/the-feast-of-the-goat.jpg", href: "/books/13" },
  { title: "Aura", image: "/books/Carlos-Fuentes/aura.jpg", href: "/books/57" },
  { title: "Blindness", image: "/books/jose-saramago/blindness.jpg", href: "/books/94" },
  { title: "Hopscotch", image: "/books/julio-cortazar/hopscotch.jpg", href: "/books/96" },
  { title: "Pedro Páramo", image: "/books/juan-rulfo/pedro-paramo.jpg", href: "/books/97" },
  { title: "The Time of the Hero", image: "/books/Mario-Vargas-Llosa/the-time-of-the-hero.jpg", href: "/books/1" },
  { title: "The Green House", image: "/books/Mario-Vargas-Llosa/the-green-house.jpg", href: "/books/2" },
  { title: "Conversation in the Cathedral", image: "/books/Mario-Vargas-Llosa/conversation-in-the-cathedral.jpg", href: "/books/3" },
  { title: "The Storyteller", image: "/books/Mario-Vargas-Llosa/the-storyteller.jpg", href: "/books/9" },
  { title: "The Death of Artemio Cruz", image: "/books/Carlos-Fuentes/the-death-of-artemio-cruz.jpg", href: "/books/58" },
  { title: "Terra Nostra", image: "/books/Carlos-Fuentes/terra-nostra.jpg", href: "/books/62" },
  { title: "The Sound and the Fury", image: "/books/william-faulkner/the-sound-and-the-fury.jpg", href: "/books/95" },
];

const favoriteBooks = favoriteBooksPool.slice(0, 5);
const moreFavoriteBooks = favoriteBooksPool.slice(5);

// First 5 are shown in the orbit; the rest go in the carousel below it, so
// the two never show the same movie.
const favoriteMoviesPool = [
  { title: "12 Angry Men", image: "/movies/12-angry-men.jpg", href: "/movies/10" },
  { title: "Citizen Kane", image: "/movies/citizen-kane.jpg", href: "/movies/3" },
  { title: "Pulp Fiction", image: "/movies/pulp-fiction.jpg", href: "/movies/6" },
  { title: "Schindler's List", image: "/movies/schindlers-list.jpg", href: "/movies/5" },
  { title: "The Shawshank Redemption", image: "/movies/the-shawshank-redemption.jpg", href: "/movies/4" },
  { title: "The Godfather", image: "/movies/francis-coppola/the-godfather.jpg", href: "/movies/1" },
  { title: "Apocalypse Now", image: "/movies/francis-coppola/apocalypse-now.jpg", href: "/movies/9" },
  { title: "The Good, the Bad and the Ugly", image: "/movies/the-good-the-bad-and-the-ugly.jpg", href: "/movies/52" },
  { title: "The Lord of the Rings: The Return of the King", image: "/movies/the-lord-of-the-rings-the-return-of-the-king.jpg", href: "/movies/13" },
  { title: "The City and the Dogs", image: "/movies/francisco-lombardi/the-city-and-the-dogs.jpg", href: "/movies/101" },
];

const favoriteMovies = favoriteMoviesPool.slice(0, 5);
const moreFavoriteMovies = favoriteMoviesPool.slice(5);

const watchlistBooks = [
  { title: "Death in the Andes", image: "/books/Mario-Vargas-Llosa/death-in-the-andes.jpg", href: "/books/11" },
  { title: "The Bad Girl", image: "/books/Mario-Vargas-Llosa/the-bad-girl.jpg", href: "/books/15" },
  { title: "The Discreet Hero", image: "/books/Mario-Vargas-Llosa/the-discreet-hero.jpg", href: "/books/17" },
  { title: "Distant Relations", image: "/books/Carlos-Fuentes/distant-relations.jpg", href: "/books/64" },
  { title: "The Old Gringo", image: "/books/Carlos-Fuentes/the-old-gringo.jpg", href: "/books/65" },
];

const watchlistMovies = [
  { title: "The Godfather Part II", image: "/movies/francis-coppola/the-godfather-part-ii.jpg", href: "/movies/2" },
  { title: "Captain Pantoja and the Special Services", image: "/movies/francisco-lombardi/captain-pantoja-and-the-special-services.jpg", href: "/movies/102" },
  { title: "The Feast of the Goat", image: "/movies/luis-llosa/the-feast-of-the-goat.jpg", href: "/movies/104" },
];

const UsersPage = async () => {
  const [books, writers, movies] = await Promise.all([
    safeFetchJson<Book>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books?limit=500`),
    safeFetchJson<Writer>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/writers`),
    safeFetchJson<Movie>(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies`),
  ]);

  return (
    <Container size="4" className="bg-[#faf6ee] py-10">
      <CategoryProvider defaultCategory="Books">
        <Grid columns="60% 40%" gap="8" align="start">
          <OrbitSwitcher
            avatarSrc="/users/Mohammad_askari.png"
            avatarAlt="Mohammad Askari"
            orbits={[
              { label: "Books", items: favoriteBooks },
              { label: "Movies", items: favoriteMovies },
            ]}
          />
          <Grid rows="auto 1fr" gap="4" className="h-[600px]">
            <UserProfileHeader
              name="Mohammad Askari"
              username="@mohammad.askari"
              avatarSrc="/users/Mohammad_askari.png"
              location="Tehran, Iran"
              joinedAt="2024-01-15T00:00:00Z"
              followersCount={128}
              followingCount={54}
            />
            <UserInfo
              aboutBooks="I read mostly tragedies and Latin American fiction. Leaf Storm is what got me hooked on Gabriel Garcia Marquez, and I still reread Mario Vargas Llosa whenever I need to be reminded why I love this stuff."
              aboutMovies="I'm partial to slow-burn dramas and anything Coppola touched in the '70s. The Godfather is the film I've rewatched more than any other, and 12 Angry Men is the one I come back to whenever I want to remember what a screenplay can do with a single room."
              sharing="Book reviews, favorite quotes, and the occasional film I think pairs well with what I'm reading, like The Godfather."
              books={books}
              writers={writers}
              movies={movies}
            />
          </Grid>
        </Grid>
        <Seprator />
        <div className="mt-10 flex flex-col gap-10">
          <CategoryCarousels
            moreFavoriteBooks={moreFavoriteBooks}
            watchlistBooks={watchlistBooks}
            moreFavoriteMovies={moreFavoriteMovies}
            watchlistMovies={watchlistMovies}
          />
          <StoriesCarousel />
        </div>
      </CategoryProvider>
    </Container>
  );
};

export default UsersPage;
