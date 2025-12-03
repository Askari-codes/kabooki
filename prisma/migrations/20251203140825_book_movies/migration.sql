-- CreateTable
CREATE TABLE `BookMovies` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `book_id` INTEGER NOT NULL,
    `movie_id` INTEGER NOT NULL,

    UNIQUE INDEX `BookMovies_book_id_movie_id_key`(`book_id`, `movie_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BookMovies` ADD CONSTRAINT `BookMovies_book_id_fkey` FOREIGN KEY (`book_id`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BookMovies` ADD CONSTRAINT `BookMovies_movie_id_fkey` FOREIGN KEY (`movie_id`) REFERENCES `Movie`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
