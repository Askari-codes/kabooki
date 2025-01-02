import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
   await prisma.book.deleteMany();
   await prisma.writer.deleteMany();

  const writers = [
    {
      name: "William",
      last_name: "Shakespeare",
      description:
        "William Shakespeare, often hailed as the greatest playwright in the English language, was born in 1564 in Stratford-upon-Avon, England. His profound impact on literature and the arts continues to resonate through his timeless works. Shakespeare's genius lies in his ability to humanize characters across a stunning array of plays and sonnets, blending intricate narratives with complex emotional depth. His plays are divided into comedies, tragedies, and histories, each revealing insights into human nature and society. Among his most celebrated tragedies are Hamlet, exploring the depths of revenge and madness;Macbeth, which examines ambition and its dire consequences; and Romeo and Juliet,a timeless tale of love and loss. His comedies, including 'A Midsummer Night's Dream' and 'As You Like It,' delight with their wit and intricate plots, showcasing Shakespeare’s masterful use of language and metaphor. Shakespeare's profound influence extends beyond literature into theatre and the performing arts, having coined phrases and introduced vocabulary still in use today. His works are studied and revered around the world, demonstrating an unparalleled ability to transcend time and culture. Shakespeare remains an enduring symbol of literary excellence, with his plays continuously performed and adapted, reflecting the universal and enduring nature of his artistry.",
      picture_url: "william-shakespeare",
      country: "England",
      slug: "william-shakespeare",
      books: [
        {
          title: "Antony and Cleopatra",
          genre: "Tragedy",
          publishedAt: new Date("1607-01-01"),
          summary:
            "The tragic romance between the Roman general Antony and the Egyptian queen Cleopatra.",
          cover_url: "Antony-and-Cleopatra",
          slug: "Antony-and-Cleopatra",
          rating: 4,
          min_price: 10.0,
        },
        {
          title: "Coriolanus",
          genre: "Tragedy",
          publishedAt: new Date("1608-01-01"),
          summary:
            "A powerful general struggles between his ambitious desires and the populace of Rome.",
          cover_url: "Coriolanus",
          slug: "Coriolanus",
          rating: 4,
          min_price: 0.0,
        },
        {
          title: "Hamlet",
          genre: "Tragedy",
          publishedAt: new Date("1600-01-01"),
          summary:
            "A prince of Denmark seeks revenge on his uncle for murdering his father.",
          cover_url: "Hamlet",
          slug: "Hamlet",
          rating: 5,
          min_price: 0.0,
        },
        {
          title: "Julius Caesar",
          genre: "Tragedy",
          publishedAt: new Date("1599-01-01"),
          summary:
            "The political assassination of Julius Caesar and its aftermath.",
          cover_url: "Julius-Caesar",
          slug: "Julius-Caesar",
          rating: 4,
          min_price: 0.0,
        },
        {
          title: "King Lear",
          genre: "Tragedy",
          publishedAt: new Date("1605-01-01"),
          summary:
            "An aging king decides to divide his kingdom among his three daughters.",
          cover_url: "King-Lear",
          slug: "King-Lear",
          rating: 5,
          min_price: 0.0,
        },
        {
          title: "Macbeth",
          genre: "Tragedy",
          publishedAt: new Date("1606-01-01"),
          summary: "A Scottish general becomes consumed by ambition and guilt.",
          cover_url: "Macbeth",
          slug: "Macbeth",
          rating: 5,
          min_price: 10.0,
        },
        {
          title: "Othello",
          genre: "Tragedy",
          publishedAt: new Date("1603-01-01"),
          summary:
            "A Moorish general in the Venetian army is led to jealousy and murder.",
          cover_url: "Othello",
          slug: "Othello",
          rating: 5,
          min_price: 0.0,
        },
        {
          title: "Romeo and Juliet",
          genre: "Tragedy",
          publishedAt: new Date("1597-01-01"),
          summary:
            "Two young lovers from feuding families tragically take their own lives.",
          cover_url: "Romeo-and-Juliet",
          slug: "Romeo-and-Juliet",
          rating: 5,
          min_price: 0.0,
        },
        {
          title: "Timon of Athens",
          genre: "Tragedy",
          publishedAt: new Date("1607-01-01"),
          summary:
            "A wealthy man becomes a misanthrope after discovering the falseness of his friends.",
          cover_url: "Timon-of-Athens",
          slug: "Timon-of-Athens",
          rating: 3,
          min_price: 10.0,
        },
        {
          title: "Titus Andronicus",
          genre: "Tragedy",
          publishedAt: new Date("1594-01-01"),
          summary:
            "A Roman general seeks vengeance against those who have wronged his family.",
          cover_url: "Titus-Andronicus",
          slug: "Titus-Andronicus",
          rating: 4,
          min_price: 0.0,
        },
      ],
    },
    {
      name: "Jane",
      last_name: "Austen",
      description:
        "An English novelist known primarily for her six major novels that critique the British landed gentry.",
      picture_url: "jane-austen",
      country: "England",
      slug: "jane-austen",
      books: [
        {
          title: "Pride and Prejudice",
          genre: "Romance",
          publishedAt: new Date("1813-01-28"),
          summary:
            "The story follows Elizabeth Bennet as she navigates issues of manners, morality, and marriage in 19th-century England.",
          cover_url: "Pride and Prejudice",
          slug: "Pride and Prejudice",
          rating: 5,
          min_price: 0.0,
        },
        {
          title: "Emma",
          genre: "Comedy of Manners",
          publishedAt: new Date("1815-12-23"),
          summary:
            "Emma Woodhouse, a young woman with a penchant for matchmaking, learns important lessons about love and relationships.",
          cover_url: "Emma",
          slug: "Emma",
          rating: 5,
          min_price: 0.0,
        },
      ],
    },
    {
      name: "William",
      last_name: "Thackeray",
      description:
        "William Makepeace Thackeray was an English novelist and author best known for his satirical works, particularly 'Vanity Fair', a panoramic portrait of English society.",
      picture_url: "william-thackeray",
      country: "United Kingdom",
      slug: "william-thackeray",
      books: [
        {
          title: "Vanity Fair",
          genre: "Satire",
          publishedAt: "1848-01-01T00:00:00Z",
          summary:
            "A novel that satirizes society in early 19th-century Britain.",
          cover_url: "vanity-fair",
          slug: "vanity-fair",
          rating: 5,
          min_price: 0.0,
        },
        {
          title: "The Luck of Barry Lyndon",
          genre: "Historical Novel",
          publishedAt: "1844-01-01T00:00:00Z",
          summary:
            "A picaresque novel that follows the fortunes of an Irish rogue on his quest to become a gentleman.",
          cover_url: "barry-lyndon",
          slug: "barry-lyndon",
          rating: 5,
          min_price: 0.0,
        },
      ],
    },
    {
      name: "Charles",
      last_name: "Dickens",
      description:
        "Charles Dickens was a British novelist, journalist, editor, illustrator, and social critic who is considered one of the greatest novelists of the Victorian era. Known for his rich storytelling and memorable characters, his major novels include 'A Tale of Two Cities' and 'Great Expectations'.",
      picture_url: "charles-dickens",
      country: "United Kingdom",
      slug: "charles-dickens",
      books:[
        {
                    title: "A Tale of Two Cities",
                    genre: "Historical Fiction",
                    publishedAt: "1859-01-01T00:00:00Z",
                    summary:
                      "A novel set in London and Paris before and during the French Revolution.",
                    cover_url: "a-tale-of-two-cities",
                    slug: "a-tale-of-two-cities",
                    rating: 5,
                    min_price: 10.0,
                  },
                  {
                    title: "Great Expectations",
                    genre: "Coming-of-Age",
                    publishedAt: "1861-01-01T00:00:00Z",
                    summary:
                      "The story of a young orphan boy and his struggles and triumphs in 19th-century England.",
                    cover_url: "great-expectations",
                    slug: "great-expectations",
                    rating: 5,
                    min_price: 0.0,
                  },
      ]
    },
  ];

  const users = [
    {
      user_name: "Mohammad Askari",
      email: "Askari.fahlyani@gmail.com",
      image: "Mohaamad Askari",
      user_favorite_books:[
        {
          bookId: 1,
          rating: 4.58,
          comment: "very good book",
        },
        {
          bookId:2,
          rating:4.68,
          comment:'I like this book'
        }
      ]
    }
  ]

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

  async function upsertUser() {
    const user = await prisma.user.upsert({
      where: {
        user_name: "Mohammad Askari",
      },
      update: {
        email: "Askari.fahlyani@gmail.com",
        image: "Mohaamad Askari",
      },
      create: {
        user_name: "Mohammad Askari",
        email: "Askari.fahlyani@gmail.com",
        image: "Mohammad Askari",
        user_favorite_books: {
          create:[
            {
              bookId: 1,
              rating: 4.58,
              comment: "very good book",
            },
          ]
        },
      },
      include: {
        user_favorite_books: true,
      },
    });
  }
  upserWriter();
  upsertUser();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

