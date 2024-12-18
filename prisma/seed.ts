// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.book.deleteMany();   // Clear all books
  await prisma.writer.deleteMany(); // Clear all writers
  const writersWithBooks = [
    {
      name: "William",
      last_name: "Shakespeare",
      description: "An English playwright, poet, and actor, widely regarded as the greatest writer in the English language.",
      picture_url: "https://example.com/pictures/shakespeare.jpg",
      country: "England",
      slug: "william-shakespeare",
      books: [
        {
          title: "Hamlet",
          genre: "Tragedy",
          publishedAt: new Date("1600-01-01"),
          summary: "A prince of Denmark seeks revenge on his uncle for murdering his father.",
          cover_url: "https://example.com/covers/hamlet.jpg",
        },
        {
          title: "Macbeth",
          genre: "Tragedy",
          publishedAt: new Date("1606-01-01"),
          summary: "A Scottish general becomes consumed by ambition and guilt.",
          cover_url: "https://example.com/covers/macbeth.jpg",
        },
      ],
    },
    {
      name: "Jane",
      last_name: "Austen",
      description: "An English novelist known primarily for her six major novels that critique the British landed gentry.",
      picture_url: "https://example.com/pictures/austen.jpg",
      country: "England",
      slug: "jane-austen",
      books: [
        {
          title: "Pride and Prejudice",
          genre: "Romance",
          publishedAt: new Date("1813-01-28"),
          summary: "The story follows Elizabeth Bennet as she navigates issues of manners, morality, and marriage in 19th-century England.",
          cover_url: "https://example.com/covers/pride-and-prejudice.jpg",
        },
        {
          title: "Emma",
          genre: "Comedy of Manners",
          publishedAt: new Date("1815-12-23"),
          summary: "Emma Woodhouse, a young woman with a penchant for matchmaking, learns important lessons about love and relationships.",
          cover_url: "https://example.com/covers/emma.jpg",
        },
      ],
    },
  ];

  for (const writer of writersWithBooks) {
    // Upsert writer
    const insertedWriter = await prisma.writer.upsert({
      where: { slug: writer.slug },
      update: {},
      create: {
        name: writer.name,
        last_name: writer.last_name,
        description: writer.description,
        picture_url: writer.picture_url,
        country: writer.country,
        slug: writer.slug,
      },
    });

    console.log(`Writer inserted: ${insertedWriter.name} ${insertedWriter.last_name}`);

    // Insert books
    const booksData = writer.books.map((book) => ({
      ...book,
      writerId: insertedWriter.id,
    }));

    await prisma.book.createMany({
      data: booksData,
    });

    console.log(`Books inserted for writer: ${insertedWriter.name} ${insertedWriter.last_name}`);
  }

  console.log("All writers and books inserted successfully!");
}

  



main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
