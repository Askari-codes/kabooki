-- CreateTable
CREATE TABLE `Book` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `genre` VARCHAR(100) NOT NULL,
    `published_at` DATETIME(3) NOT NULL,
    `summary` TEXT NULL,
    `cover_url` VARCHAR(255) NULL,
    `writer_id` INTEGER NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `rating` INTEGER NOT NULL,
    `min_price` DOUBLE NOT NULL,

    UNIQUE INDEX `Book_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Podcast` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `genre` VARCHAR(100) NOT NULL,
    `published_at` DATETIME(3) NOT NULL,
    `summary` TEXT NULL,
    `cover_url` VARCHAR(255) NULL,
    `host_id` INTEGER NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `rating` INTEGER NOT NULL,
    `min_price` DECIMAL(65, 30) NOT NULL,

    UNIQUE INDEX `Podcast_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Movie` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `rating` DOUBLE NOT NULL,
    `published_at` DATETIME(3) NOT NULL,
    `summary` TEXT NULL,
    `poster` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `stream` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Movie_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Genre` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MoviesGenres` (
    `movie_id` INTEGER NOT NULL,
    `genre_id` INTEGER NOT NULL,

    PRIMARY KEY (`movie_id`, `genre_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MoviesDirectors` (
    `movie_id` INTEGER NOT NULL,
    `director_id` INTEGER NOT NULL,

    PRIMARY KEY (`movie_id`, `director_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Director` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `picture_url` VARCHAR(255) NULL,
    `country` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Director_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Writer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `picture_url` VARCHAR(255) NULL,
    `country` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Writer_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BooksWriters` (
    `book_id` INTEGER NOT NULL,
    `writer_id` INTEGER NOT NULL,

    PRIMARY KEY (`book_id`, `writer_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Host` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `picture_url` VARCHAR(255) NULL,
    `country` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Host_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,

    UNIQUE INDEX `User_user_name_key`(`user_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserFavoriteBooks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rating` DOUBLE NULL,
    `comment` TEXT NULL,
    `user_Id` INTEGER NOT NULL,
    `book_Id` INTEGER NOT NULL,

    UNIQUE INDEX `UserFavoriteBooks_user_Id_book_Id_key`(`user_Id`, `book_Id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserFavoritePodcasts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rating` DOUBLE NULL,
    `comment` TEXT NULL,
    `user_id` INTEGER NOT NULL,
    `podcast_id` INTEGER NOT NULL,

    UNIQUE INDEX `UserFavoritePodcasts_user_id_podcast_id_key`(`user_id`, `podcast_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserFavoriteMovies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rating` DOUBLE NULL,
    `comment` VARCHAR(191) NULL,
    `user_id` INTEGER NOT NULL,
    `movie_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Podcast` ADD CONSTRAINT `Podcast_host_id_fkey` FOREIGN KEY (`host_id`) REFERENCES `Host`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MoviesGenres` ADD CONSTRAINT `MoviesGenres_movie_id_fkey` FOREIGN KEY (`movie_id`) REFERENCES `Movie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MoviesGenres` ADD CONSTRAINT `MoviesGenres_genre_id_fkey` FOREIGN KEY (`genre_id`) REFERENCES `Genre`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MoviesDirectors` ADD CONSTRAINT `MoviesDirectors_movie_id_fkey` FOREIGN KEY (`movie_id`) REFERENCES `Movie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MoviesDirectors` ADD CONSTRAINT `MoviesDirectors_director_id_fkey` FOREIGN KEY (`director_id`) REFERENCES `Director`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BooksWriters` ADD CONSTRAINT `BooksWriters_book_id_fkey` FOREIGN KEY (`book_id`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BooksWriters` ADD CONSTRAINT `BooksWriters_writer_id_fkey` FOREIGN KEY (`writer_id`) REFERENCES `Writer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserFavoriteBooks` ADD CONSTRAINT `UserFavoriteBooks_user_Id_fkey` FOREIGN KEY (`user_Id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserFavoriteBooks` ADD CONSTRAINT `UserFavoriteBooks_book_Id_fkey` FOREIGN KEY (`book_Id`) REFERENCES `Book`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserFavoritePodcasts` ADD CONSTRAINT `UserFavoritePodcasts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserFavoritePodcasts` ADD CONSTRAINT `UserFavoritePodcasts_podcast_id_fkey` FOREIGN KEY (`podcast_id`) REFERENCES `Podcast`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserFavoriteMovies` ADD CONSTRAINT `UserFavoriteMovies_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserFavoriteMovies` ADD CONSTRAINT `UserFavoriteMovies_movie_id_fkey` FOREIGN KEY (`movie_id`) REFERENCES `Movie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
