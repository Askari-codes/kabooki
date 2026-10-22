-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "genre" VARCHAR(100) NOT NULL,
    "published_at" TIMESTAMP(3) NOT NULL,
    "summary" TEXT,
    "cover_url" VARCHAR(255),
    "slug" VARCHAR(255) NOT NULL,
    "rating" INTEGER NOT NULL,
    "min_price" DOUBLE PRECISION NOT NULL,
    "is_the_best" BOOLEAN NOT NULL DEFAULT false,
    "pdf_url" TEXT,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RelatedBook" (
    "id" SERIAL NOT NULL,
    "bookId" INTEGER NOT NULL,
    "relatedBookId" INTEGER NOT NULL,

    CONSTRAINT "RelatedBook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movie" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "related_book_title" TEXT,
    "rating" DOUBLE PRECISION NOT NULL,
    "published_at" TIMESTAMP(3) NOT NULL,
    "summary" TEXT,
    "poster" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "stream" TEXT NOT NULL,
    "directorId" INTEGER,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookMovies" (
    "id" SERIAL NOT NULL,
    "book_id" INTEGER NOT NULL,
    "movie_id" INTEGER NOT NULL,

    CONSTRAINT "BookMovies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Podcast" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "genre" VARCHAR(100) NOT NULL,
    "published_at" TIMESTAMP(3) NOT NULL,
    "summary" TEXT,
    "cover_url" VARCHAR(255),
    "host_id" INTEGER NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "rating" INTEGER NOT NULL,
    "min_price" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "Podcast_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MoviesGenres" (
    "movie_id" INTEGER NOT NULL,
    "genre_id" INTEGER NOT NULL,

    CONSTRAINT "MoviesGenres_pkey" PRIMARY KEY ("movie_id","genre_id")
);

-- CreateTable
CREATE TABLE "Director" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "picture_url" VARCHAR(255),
    "country" TEXT NOT NULL,
    "slug" VARCHAR(255) NOT NULL,

    CONSTRAINT "Director_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Writer" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "picture_url" VARCHAR(255),
    "country" TEXT NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "nobelist" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Writer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RelatedWriters" (
    "id" SERIAL NOT NULL,
    "writer_id_1" INTEGER NOT NULL,
    "writer_id_2" INTEGER NOT NULL,

    CONSTRAINT "RelatedWriters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BooksWriters" (
    "book_id" INTEGER NOT NULL,
    "writer_id" INTEGER NOT NULL,

    CONSTRAINT "BooksWriters_pkey" PRIMARY KEY ("book_id","writer_id")
);

-- CreateTable
CREATE TABLE "Host" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "picture_url" VARCHAR(255),
    "country" TEXT NOT NULL,
    "slug" VARCHAR(255) NOT NULL,

    CONSTRAINT "Host_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "avatar" VARCHAR(255),
    "bio" TEXT,
    "location" VARCHAR(100),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserFavoriteBooks" (
    "id" SERIAL NOT NULL,
    "rating" DOUBLE PRECISION,
    "comment" TEXT,
    "user_Id" INTEGER NOT NULL,
    "book_Id" INTEGER NOT NULL,

    CONSTRAINT "UserFavoriteBooks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserFavoritePodcasts" (
    "id" SERIAL NOT NULL,
    "rating" DOUBLE PRECISION,
    "comment" TEXT,
    "user_id" INTEGER NOT NULL,
    "podcast_id" INTEGER NOT NULL,

    CONSTRAINT "UserFavoritePodcasts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserFavoriteMovies" (
    "id" SERIAL NOT NULL,
    "rating" DOUBLE PRECISION,
    "comment" TEXT,
    "user_id" INTEGER NOT NULL,
    "movie_id" INTEGER NOT NULL,

    CONSTRAINT "UserFavoriteMovies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_favorite_writers" (
    "id" SERIAL NOT NULL,
    "rating" DOUBLE PRECISION,
    "comment" TEXT,
    "user_id" INTEGER NOT NULL,
    "writer_id" INTEGER NOT NULL,

    CONSTRAINT "user_favorite_writers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_favorite_directors" (
    "id" SERIAL NOT NULL,
    "rating" DOUBLE PRECISION,
    "comment" TEXT,
    "user_id" INTEGER NOT NULL,
    "director_id" INTEGER NOT NULL,

    CONSTRAINT "user_favorite_directors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "follow" (
    "id" SERIAL NOT NULL,
    "followerId" INTEGER NOT NULL,
    "followingId" INTEGER NOT NULL,

    CONSTRAINT "follow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Book_slug_key" ON "Book"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "RelatedBook_bookId_relatedBookId_key" ON "RelatedBook"("bookId", "relatedBookId");

-- CreateIndex
CREATE UNIQUE INDEX "Movie_slug_key" ON "Movie"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "BookMovies_book_id_movie_id_key" ON "BookMovies"("book_id", "movie_id");

-- CreateIndex
CREATE UNIQUE INDEX "Podcast_slug_key" ON "Podcast"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Director_slug_key" ON "Director"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Writer_slug_key" ON "Writer"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "RelatedWriters_writer_id_1_writer_id_2_key" ON "RelatedWriters"("writer_id_1", "writer_id_2");

-- CreateIndex
CREATE UNIQUE INDEX "Host_slug_key" ON "Host"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserFavoriteBooks_user_Id_book_Id_key" ON "UserFavoriteBooks"("user_Id", "book_Id");

-- CreateIndex
CREATE UNIQUE INDEX "UserFavoritePodcasts_user_id_podcast_id_key" ON "UserFavoritePodcasts"("user_id", "podcast_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_favorite_writers_user_id_writer_id_key" ON "user_favorite_writers"("user_id", "writer_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_favorite_directors_user_id_director_id_key" ON "user_favorite_directors"("user_id", "director_id");

-- CreateIndex
CREATE UNIQUE INDEX "follow_followerId_followingId_key" ON "follow"("followerId", "followingId");

-- AddForeignKey
ALTER TABLE "RelatedBook" ADD CONSTRAINT "RelatedBook_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelatedBook" ADD CONSTRAINT "RelatedBook_relatedBookId_fkey" FOREIGN KEY ("relatedBookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_directorId_fkey" FOREIGN KEY ("directorId") REFERENCES "Director"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookMovies" ADD CONSTRAINT "BookMovies_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookMovies" ADD CONSTRAINT "BookMovies_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Podcast" ADD CONSTRAINT "Podcast_host_id_fkey" FOREIGN KEY ("host_id") REFERENCES "Host"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoviesGenres" ADD CONSTRAINT "MoviesGenres_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoviesGenres" ADD CONSTRAINT "MoviesGenres_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelatedWriters" ADD CONSTRAINT "RelatedWriters_writer_id_1_fkey" FOREIGN KEY ("writer_id_1") REFERENCES "Writer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelatedWriters" ADD CONSTRAINT "RelatedWriters_writer_id_2_fkey" FOREIGN KEY ("writer_id_2") REFERENCES "Writer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BooksWriters" ADD CONSTRAINT "BooksWriters_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BooksWriters" ADD CONSTRAINT "BooksWriters_writer_id_fkey" FOREIGN KEY ("writer_id") REFERENCES "Writer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavoriteBooks" ADD CONSTRAINT "UserFavoriteBooks_user_Id_fkey" FOREIGN KEY ("user_Id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavoriteBooks" ADD CONSTRAINT "UserFavoriteBooks_book_Id_fkey" FOREIGN KEY ("book_Id") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavoritePodcasts" ADD CONSTRAINT "UserFavoritePodcasts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavoritePodcasts" ADD CONSTRAINT "UserFavoritePodcasts_podcast_id_fkey" FOREIGN KEY ("podcast_id") REFERENCES "Podcast"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavoriteMovies" ADD CONSTRAINT "UserFavoriteMovies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavoriteMovies" ADD CONSTRAINT "UserFavoriteMovies_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_favorite_writers" ADD CONSTRAINT "user_favorite_writers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_favorite_writers" ADD CONSTRAINT "user_favorite_writers_writer_id_fkey" FOREIGN KEY ("writer_id") REFERENCES "Writer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_favorite_directors" ADD CONSTRAINT "user_favorite_directors_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_favorite_directors" ADD CONSTRAINT "user_favorite_directors_director_id_fkey" FOREIGN KEY ("director_id") REFERENCES "Director"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
