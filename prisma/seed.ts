// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.book.deleteMany();   
  await prisma.writer.deleteMany(); 
  const writersWithBooks = [
    {
      name: "William",
      last_name: "Shakespeare",
      description: "An English playwright, poet, and actor, widely regarded as the greatest writer in the English language.",
      picture_url: 'william-shakespeare',
      country: "England",
      slug: "william-shakespeare",
      books: [
        {
          title: "Hamlet",
          genre: "Tragedy",
          publishedAt: new Date("1600-01-01"),
          summary: "A prince of Denmark seeks revenge on his uncle for murdering his father.",
          cover_url: "Hamlet",
          slug:'Hamlet',
          rating:5
        },
        {
          title: "Macbeth",
          genre: "Tragedy",
          publishedAt: new Date("1606-01-01"),
          summary: "A Scottish general becomes consumed by ambition and guilt.",
          cover_url: "Macbeth",
          slug:'Macbeth',
          rating:5
        },
      ],
    },
    {
      name: "Jane",
      last_name: "Austen",
      description: "An English novelist known primarily for her six major novels that critique the British landed gentry.",
      picture_url: "jane-austen",
      country: "England",
      slug: "jane-austen",
      books: [
        {
          title: "Pride and Prejudice",
          genre: "Romance",
          publishedAt: new Date("1813-01-28"),
          summary: "The story follows Elizabeth Bennet as she navigates issues of manners, morality, and marriage in 19th-century England.",
          cover_url: "Pride and Prejudice",
          slug:'Pride and Prejudice',
          rating:5
        },
        {
          title: "Emma",
          genre: "Comedy of Manners",
          publishedAt: new Date("1815-12-23"),
          summary: "Emma Woodhouse, a young woman with a penchant for matchmaking, learns important lessons about love and relationships.",
          cover_url: "Emma",
          slug:'Emma',
          rating:5
        },
      ],
    },
    {
      name: "William",
      last_name: "Thackeray",
      description: "William Makepeace Thackeray was an English novelist and author best known for his satirical works, particularly 'Vanity Fair', a panoramic portrait of English society.",
      picture_url: "william-thackeray",
      country: "United Kingdom",
      slug: "william-thackeray",
      books: [
        {
          title: "Vanity Fair",
          genre: "Satire",
          publishedAt: "1848-01-01T00:00:00Z",
          summary: "A novel that satirizes society in early 19th-century Britain.",
          cover_url: "vanity-fair",
          slug: "vanity-fair",
          rating: 5
        },
        {
          title: "The Luck of Barry Lyndon",
          genre: "Historical Novel",
          publishedAt: "1844-01-01T00:00:00Z",
          summary: "A picaresque novel that follows the fortunes of an Irish rogue on his quest to become a gentleman.",
          cover_url: "barry-lyndon",
          slug: "barry-lyndon",
          rating: 5
        }
      ]
    },
    {
      name: "Charles",
      last_name: "Dickens",
      description: "Charles Dickens was a British novelist, journalist, editor, illustrator, and social critic who is considered one of the greatest novelists of the Victorian era. Known for his rich storytelling and memorable characters, his major novels include 'A Tale of Two Cities' and 'Great Expectations'.",
      picture_url: "charles-dickens",
      country: "United Kingdom",
      slug: "charles-dickens",
      books: [
        {
          title: "A Tale of Two Cities",
          genre: "Historical Fiction",
          publishedAt: "1859-01-01T00:00:00Z",
          summary: "A novel set in London and Paris before and during the French Revolution.",
          cover_url: "a-tale-of-two-cities",
          slug: "a-tale-of-two-cities",
          rating: 5
        },
        {
          title: "Great Expectations",
          genre: "Coming-of-Age",
          publishedAt: "1861-01-01T00:00:00Z",
          summary: "The story of a young orphan boy and his struggles and triumphs in 19th-century England.",
          cover_url: "great-expectations",
          slug: "great-expectations",
          rating: 5
        }
      ]
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


    // Insert books
    const booksData = writer.books.map((book) => ({
      ...book,
      writerId: insertedWriter.id,
    }));

    await prisma.book.createMany({
      data: booksData,
    });

  }

}

  



main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
