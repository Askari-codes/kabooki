/*
  Warnings:

  - You are about to drop the `Follow` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserFavoriteDirectors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserFavoriteWriters` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Follow` DROP FOREIGN KEY `follow_followerId_fkey`;

-- DropForeignKey
ALTER TABLE `Follow` DROP FOREIGN KEY `follow_followingId_fkey`;

-- DropForeignKey
ALTER TABLE `UserFavoriteBooks` DROP FOREIGN KEY `UserFavoriteBooks_user_Id_fkey`;

-- DropForeignKey
ALTER TABLE `user_favorite_directors` DROP FOREIGN KEY `user_favorite_directors_director_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_favorite_directors` DROP FOREIGN KEY `user_favorite_directors_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `UserFavoriteMovies` DROP FOREIGN KEY `UserFavoriteMovies_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `UserFavoritePodcasts` DROP FOREIGN KEY `UserFavoritePodcasts_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_favorite_writers` DROP FOREIGN KEY `user_favorite_writers_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_favorite_writers` DROP FOREIGN KEY `user_favorite_writers_writer_id_fkey`;

-- DropTable
DROP TABLE `Follow`;

-- DropTable
DROP TABLE `User`;

-- DropTable
DROP TABLE `user_favorite_directors`;

-- DropTable
DROP TABLE `user_favorite_writers`;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `avatar` VARCHAR(255) NULL,
    `bio` TEXT NULL,
    `location` VARCHAR(100) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `user_username_key`(`username`),
    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_favorite_writers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rating` DOUBLE NULL,
    `comment` TEXT NULL,
    `user_id` INTEGER NOT NULL,
    `writer_id` INTEGER NOT NULL,

    UNIQUE INDEX `user_favorite_writers_user_id_writer_id_key`(`user_id`, `writer_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_favorite_directors` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rating` DOUBLE NULL,
    `comment` TEXT NULL,
    `user_id` INTEGER NOT NULL,
    `director_id` INTEGER NOT NULL,

    UNIQUE INDEX `user_favorite_directors_user_id_director_id_key`(`user_id`, `director_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Follow` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `followerId` INTEGER NOT NULL,
    `followingId` INTEGER NOT NULL,

    UNIQUE INDEX `follow_followerId_followingId_key`(`followerId`, `followingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserFavoriteBooks` ADD CONSTRAINT `UserFavoriteBooks_user_Id_fkey` FOREIGN KEY (`user_Id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserFavoritePodcasts` ADD CONSTRAINT `UserFavoritePodcasts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserFavoriteMovies` ADD CONSTRAINT `UserFavoriteMovies_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_favorite_writers` ADD CONSTRAINT `user_favorite_writers_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_favorite_writers` ADD CONSTRAINT `user_favorite_writers_writer_id_fkey` FOREIGN KEY (`writer_id`) REFERENCES `Writer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_favorite_directors` ADD CONSTRAINT `user_favorite_directors_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_favorite_directors` ADD CONSTRAINT `user_favorite_directors_director_id_fkey` FOREIGN KEY (`director_id`) REFERENCES `Director`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Follow` ADD CONSTRAINT `follow_followerId_fkey` FOREIGN KEY (`followerId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Follow` ADD CONSTRAINT `follow_followingId_fkey` FOREIGN KEY (`followingId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
