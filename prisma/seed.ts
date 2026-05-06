import { PrismaClient } from "@prisma/client";
import {
  directors,
  writers,
  movies,
  genres,
  moviesDirectors,
  moviesGenres,
  books,
  booksWriters,
  relatedWriters,
  bookMovies,
  bookRelatedToOtherBooks,
  users,
  userFavoriteBooks,
  userFavoriteWriters,
  userFavoriteMovies,
} from "./data/Data";

const prisma = new PrismaClient();

async function main() {
  console.log(Object.keys(prisma).filter(k => !k.startsWith('$')).sort());

  await prisma.follow.deleteMany();
  await prisma.userFavoriteBooks.deleteMany();
  await prisma.userFavoriteMovies.deleteMany();
  await prisma.userFavoritePodcasts.deleteMany();
  await prisma.userFavoriteWriters.deleteMany();
  await prisma.userFavoriteDirectors.deleteMany();
  await prisma.user.deleteMany();
  await prisma.book.deleteMany();
  await prisma.relatedBook.deleteMany
  await prisma.booksWriters.deleteMany()
  await prisma.relatedWriters.deleteMany()
  await prisma.moviesGenres.deleteMany();
  await prisma.genre.deleteMany();
  await prisma.movie.deleteMany();
  await prisma.director.deleteMany();
  await prisma.writer.deleteMany();
  
   async function insertDirector() {
    for (const director of directors) {
      await prisma.director.create({
        data: {
          id: director.id,
          name: director.name,
          last_name: director.last_name,
          description: director.description,
          picture_url: director.picture_url,
          country: director.country,
          slug: director.slug,
        },
      });
    }
  }

  await insertDirector();

  async function insertMovie() {
    for (const movie of movies) {
      await prisma.movie.upsert({
        where: { slug: movie.slug },
        update: {},
        create: {
          id: movie.id,
          title: movie.title,
          related_book_title:movie.related_book_title,
          rating: movie.rating,
          published_at: movie.published_at,
          summary: movie.summary,
          poster: movie.poster,
          slug: movie.slug,
          stream: movie.stream,
         directorId:movie.directorId
        },
      });
    }
  }

  await insertMovie();

 async function insertBooks() {
  for(const book of books){
    await prisma.book.upsert({
      where:{id:book.id},
      update:{},
      create:{
        
        id:book.id,
        title:book.title,
        genre:book.genre,
        published_at:book.published_at,
        summary:book.summary,
        cover_url:book.cover_url,
        slug:book.slug,
        rating:book.rating,
        min_price:book.min_price,
        is_the_best:book.is_the_best,
        pdf_url:book.pdf_url


      }
    })
  }
 }

 await insertBooks()

 async function insertBookRelatedToOtherBooks() {
  for(const item of bookRelatedToOtherBooks){
    await prisma.relatedBook.create({
      data:{
        bookId:item.bookId,
        relatedBookId:item.relatedBookId
      }
    })
      }
    }
    await insertBookRelatedToOtherBooks()
 

 async function insertBookMovies() {
  for(const item of bookMovies){
    await prisma.bookMovies.create({
      data:{
        book_id:item.book_id,
        movie_id:item.movie_id
      }
    })
  }
 }

 await insertBookMovies()
  

  async function insertWriter() {
    for (const writer of writers) {
      await prisma.writer.upsert({
        where: { slug: writer.slug },
        update: {},
        create: {
          id: writer.id,
          name: writer.name,
          last_name: writer.last_name,
          description: writer.description,
          picture_url: writer.picture_url,
          country: writer.country,
          slug: writer.slug,
          nobelist:writer.nobelist
        
        },
      });
    }
  }

  await insertWriter();

 

  async function insertGenre() {
    for (const genre of genres) {
      await prisma.genre.create({
        data: {
          id: genre.id,
          name: genre.name,
        },
      });
    }
  }

  await insertGenre();

  async function insertBooksWriters() {
    for(const bookwriter of booksWriters){
      await prisma.booksWriters.create({
        data:{
          book_id:bookwriter.book_id,
          writer_id:bookwriter.writer_id
        }
      })
    }
  }

  await insertBooksWriters()

  async function insertRelatedWriters(){
    for(const item of relatedWriters){
      await prisma.relatedWriters.create({
        data:{
          writer_id_1:item.writer_id_1,
          writer_id_2:item.writer_id_2
        }
      })
    }
  }

  insertRelatedWriters()

  async function insertUsers() {
    for (const user of users) {
      await prisma.user.upsert({
        where: { username: user.username },
        update: {},
        create: {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
          password: user.password,
          avatar: user.avatar,
          bio: user.bio,
          location: user.location,
        },
      });
    }
  }

  await insertUsers();

  async function insertUserFavoriteBooks() {
    for (const item of userFavoriteBooks) {
      await prisma.userFavoriteBooks.upsert({
        where: { user_Id_book_Id: { user_Id: item.user_Id, book_Id: item.book_Id } },
        update: {},
        create: {
          id: item.id,
          user_Id: item.user_Id,
          book_Id: item.book_Id,
          rating: item.rating,
          comment: item.comment,
        },
      });
    }
  }

  await insertUserFavoriteBooks();

  async function insertUserFavoriteWriters() {
    for (const item of userFavoriteWriters) {
      await prisma.userFavoriteWriters.upsert({
        where: { user_id_writer_id: { user_id: item.user_id, writer_id: item.writer_id } },
        update: {},
        create: {
          id: item.id,
          user_id: item.user_id,
          writer_id: item.writer_id,
          rating: item.rating,
          comment: item.comment,
        },
      });
    }
  }

  await insertUserFavoriteWriters();

  async function insertUserFavoriteMovies() {
    for (const item of userFavoriteMovies) {
      await prisma.userFavoriteMovies.create({
        data: {
          id: item.id,
          user_id: item.user_id,
          movie_id: item.movie_id,
          rating: item.rating,
          comment: item.comment,
        },
      });
    }
  }

  await insertUserFavoriteMovies();

  // async function insertMovieDirector() {
  //   for (const moviesDirector of moviesDirectors) {
  //     await prisma.moviesDirectors.create({
  //       data: {
  //         movie_id: moviesDirector.movie_id,
  //         director_id: moviesDirector.director_id,
  //       },
  //     });
  //   }
  // }

  // await insertMovieDirector();

  async function insertMovieGenre() {
    for (const moviesGenre of moviesGenres) {
      await prisma.moviesGenres.create({
        data: {
          movie_id: moviesGenre.movie_id,
          genre_id: moviesGenre.genre_id,
        },
      });
    }
  }

  await insertMovieGenre();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
