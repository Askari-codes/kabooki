"use client";

import FavoriteItemsCarousel from "./FavoriteItemsCarousel";
import { OrbitItem } from "./FavoriteOrbit";
import { useCategory } from "./CategoryContext";

interface Props {
  moreFavoriteBooks: OrbitItem[];
  watchlistBooks: OrbitItem[];
  moreFavoriteMovies: OrbitItem[];
  watchlistMovies: OrbitItem[];
}

const CategoryCarousels = ({
  moreFavoriteBooks,
  watchlistBooks,
  moreFavoriteMovies,
  watchlistMovies,
}: Props) => {
  const { category } = useCategory();

  if (category === "Movies") {
    return (
      <>
        <FavoriteItemsCarousel title="More Favorite Movies" items={moreFavoriteMovies} />
        <FavoriteItemsCarousel title="Watchlist" items={watchlistMovies} />
      </>
    );
  }

  return (
    <>
      <FavoriteItemsCarousel title="More Favorite Books" items={moreFavoriteBooks} />
      <FavoriteItemsCarousel title="Reading List" items={watchlistBooks} />
    </>
  );
};

export default CategoryCarousels;
