import { PrismaClient } from "@prisma/client";
import { writers } from "./data/WritersWithBooks";
import movies from "./data/Movies";
import { getFavoriteMovies } from "./data/FavoriteMovies";
import { hosts } from "./data/HostWithPodcasts";

const prisma = new PrismaClient();

async function main() {
 
  await prisma.userFavoriteBook.deleteMany();
  await prisma.book.deleteMany();
  await prisma.writer.deleteMany();
 
  const myFavoriteMovies = getFavoriteMovies().then(movie=>movie)
  console.log(myFavoriteMovies);
  
  

  

  async function upserWriter() {
    for (const writer of writers) {
      await prisma.writer.upsert({
        where: { slug: writer.slug },
        update: {},
        create: {
          name: writer.name,
          last_name: writer.last_name,
          description: writer.description,
          picture_url: writer.picture_url,
          country: writer.country,
          slug: writer.slug,
          books: {
            create: writer.books.map((book) => ({
              title: book.title,
              genre: book.genre,
              publishedAt: book.publishedAt,
              summary: book.summary,
              cover_url: book.cover_url,
              slug: book.slug,
              rating: book.rating,
              min_price: book.min_price,
            })),
          },
        },
      });
    }
  }
  await upserWriter();

  const Hamlet = await prisma.book.findUnique({
    where: {
      slug: "Hamlet",
    },
  });
  if (!Hamlet) {
    throw new Error("there is no such a book");
  }

  const Macbeth = await prisma.book.findUnique({
    where: {
      slug: "Macbeth",
    },
  });
  if (!Macbeth) {
    throw new Error("there is no such a book");
  }
  const Othello = await prisma.book.findUnique({
    where: {
      slug: "Othello",
    },
  });
  if (!Othello) {
    throw new Error("there is no such a book");
  }
  const Emma = await prisma.book.findUnique({
    where: {
      slug: "Emma",
    },
  });
  if (!Emma) {
    throw new Error("there is no such a book");
  }
  const vanity_fair = await prisma.book.findUnique({
    where: {
      slug: "vanity-fair",
    },
  });
  if (!vanity_fair) {
    throw new Error("there is no such a book");
  }
  const a_tale_of_two_cities = await prisma.book.findUnique({
    where: {
      slug: "a-tale-of-two-cities",
    },
  });
  if (!a_tale_of_two_cities) {
    throw new Error("there is no such a book");
  }

  async function upsertUser() {
    await prisma.user.upsert({
      where: {
        user_name: "Mohammad Askari",
      },
      update: {},
      create: {
        user_name: "Mohammad Askari",
        email: "Askari.fahlyani@gmail.com",
        image: "Mohammad Askari",
      },
    });
  }
  upsertUser();
  const user = await prisma.user.findUnique({
    where: {
      user_name: "Mohammad Askari",
    },
  });
  if (!user) {
    throw new Error("there is no such a user");
  }
  async function upsertUserFavoriteBook(
    userId: number,
    bookId: number,
    rating: number,
    comment: string
  ) {
    try {
      const existingFavorite = await prisma.userFavoriteBook.findFirst({
        where: {
          AND: [{ userId: userId }, { bookId: bookId }],
        },
      });

      let userFavoriteBook;

      if (existingFavorite) {
        userFavoriteBook = await prisma.userFavoriteBook.update({
          where: { id: existingFavorite.id },
          data: {
            rating: rating,
            comment: comment,
          },
        });
      } else {
        userFavoriteBook = await prisma.userFavoriteBook.create({
          data: {
            userId: userId,
            bookId: bookId,
            rating: rating,
            comment: comment,
          },
        });
      }

      console.log("Upserted UserFavoriteBook:", userFavoriteBook);
      return userFavoriteBook;
    } catch (error) {
      console.error("Error upserting UserFavoriteBook:", error);
      throw error;
    }
  }

  upsertUserFavoriteBook(
    user!.id,
    Hamlet.id,
    4.5,
    "As a recent reader of Shakespeare's 'Hamlet,' I found myself completely engrossed by the tragic tale of the Prince of Denmark."
  );
  upsertUserFavoriteBook(
    user!.id,
    Macbeth.id,
    4.2,
    "Shakespeare's 'Macbeth' is a riveting exploration of ambition and guilt. The play delves into the dark side of the human psyche as Macbeth, driven by prophetic ent."
  );
  upsertUserFavoriteBook(
    user!.id,
    Emma.id,
    5,
    "Jane Austen's 'Emma' is a delightful and incisive portrayal of social dynamics and personal growth within a small English village. The title character, Emma Woodhouse, is charming yet flawed, making her both endearing and frustrating. Austen's sharp wit and keen observations of human nature shine through in her critique of class and matchmaking. The narrative's pacing is perfect, leading to misunderstandings that are both humorous and revealing. This novel not only entertains but also offers a critical look at the constraints faced by women in the 19th century. A timeless classic that continues to resonate with readers today."
  );
  upsertUserFavoriteBook(
    user!.id,
    vanity_fair.id,
    5,
    "William Makepeace Thackeray's 'Vanity Fair' is a masterful satire of early 19th-century British society, where morality is often overshadowed by cunning and greed. Through the cunning Becky Sharp and the kind-hearted Amelia Sedley, Thackeray explores themes of social climbing and the pursuit of wealth. His sharp, ironic narration exposes the hypocrisies of an era obsessed with social status. The novel's breadth of characters and subplots weave a complex tapestry that illustrates the titular 'fair' as a never-ending parade of human foibles. A brilliant and biting critique that remains incredibly relevant."
  );
  upsertUserFavoriteBook(
    user!.id,
    a_tale_of_two_cities.id,
    5,
    "Charles Dickens' 'A Tale of Two Cities' is a profound narrative of love, sacrifice, and revolution set against the backdrop of the French Revolution. The contrast between the cities of London and Paris provides a powerful examination of social injustice and human resilience. Dickens masterfully uses his characters, like the self-sacrificing Sydney Carton and the resilient Dr. Manette, to explore themes of redemption and rebirth amidst turmoil. His rich descriptions and intense plot twists make this a compelling read that captures the chaos and fervor of an era. A timeless piece that underscores the best and worst of human nature."
  );
}

// Movie part

try {
  await prisma.userFavoriteMovie.deleteMany()
  await prisma.movie.deleteMany();
} catch (error) {
  console.error("Deletion failed: ", error);
}


await prisma.movie.createMany({
  data: movies,
  skipDuplicates: false,
});

const the_godfather_part_ii = await prisma.movie.findUnique({
  where: {
    slug: "the-godfather-part-ii",
  },
});
if (!the_godfather_part_ii) {
  throw new Error("there is no such a movie");
}

const pulp_fiction = await prisma.movie.findUnique({
  where:{
    slug:'pulp-fiction'
  }
})
if(!pulp_fiction){
  throw new Error('there is no such a movie')
}

const the_lord_of_the_rings_the_fellowship_of_the_ring = await prisma.movie.findUnique({
  where:{
    slug:'the-lord-of-the-rings-the-fellowship-of-the-ring'
  }
})
if (!the_lord_of_the_rings_the_fellowship_of_the_ring) {
  throw new Error('there is no such a movie')
}

async function addUserFavoriteMovie(
  userId: number,
  movieId: number,
  rating: number,
  comment: string
) {
  try {
    const existFovoriteMovie = await prisma.userFavoriteMovie.findFirst({
      where: {
        AND: {
          userId,
          movieId,
        },
      },
    });

    if (existFovoriteMovie) {
      await prisma.userFavoriteMovie.update({
        where: { id: existFovoriteMovie.id },
        data: {
          rating,
          comment,
        },
      });
    }else{
      await prisma.userFavoriteMovie.create({
        data:{
          userId,
          movieId,
          rating,
          comment
        }
      })
    }
  } catch (error) {}
}

const the_good_the_bad_and_the_ugly = await prisma.movie.findUnique({
  where:{
    slug:'the-good-the-bad-and-the-ugly'
  }
})
if (!the_good_the_bad_and_the_ugly) {
  throw new Error('there is no such a book')
}



const user = await prisma.user.findUnique({
  where: {
    user_name: "Mohammad Askari",
  },
});

if (!user) {
  throw new Error("there is no such a user");
}
await addUserFavoriteMovie(user.id, the_godfather_part_ii.id, 9.0, "the godfather part two is my favorite movie");
await addUserFavoriteMovie(user.id, pulp_fiction.id, 9.5, "a very beatiful and pleasent movie");
await addUserFavoriteMovie(user.id, the_lord_of_the_rings_the_fellowship_of_the_ring.id, 10, "this is the best movie that I've ever seen");
await addUserFavoriteMovie(user.id, the_good_the_bad_and_the_ugly.id, 8.5, "the good the bad and the ugly is my favorite western movie");

// podcat part
try {
  await prisma.podcast.deleteMany()
  await prisma.host.deleteMany()
} catch (error) {
  console.log(error);
  
}
async function upsertHost() {
  for (const host of hosts) {
    await prisma.host.upsert({
      where: { slug: host.slug },
      update: {},
      create: {
        name: host.name,
        last_name: host.last_name,
        description: host.description,
        picture_url: host.picture_url,
        country: host.country,
        slug: host.slug,
        podcasts: {
          create: host.podcasts.map((podcast) => ({
            title:podcast.title,
            publishedAt:podcast.publishedAt,
            genre: podcast.genre,
            summary: podcast.summary,
            cover_url: podcast.cover_url,
            slug: podcast.slug,
            rating: podcast.rating,
            min_price: podcast.min_price,
          })),
        },
      },
    });
  }
}

await upsertHost()


main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
