import BookCarousel from "./BookCarousel";

const BookSection = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/books`,
    {
      cache: "no-cache",
    }
  );
  const books = await response.json();

  return <BookCarousel books={books} title="Favorit Books" />;
};

export default BookSection;
