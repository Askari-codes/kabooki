/*
  Warnings:

  - You are about to drop the `moviesdirectors` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `moviesdirectors` DROP FOREIGN KEY `MoviesDirectors_director_id_fkey`;

-- DropForeignKey
ALTER TABLE `moviesdirectors` DROP FOREIGN KEY `MoviesDirectors_movie_id_fkey`;

-- AlterTable
ALTER TABLE `movie` ADD COLUMN `directorId` INTEGER NULL;

-- DropTable
DROP TABLE `moviesdirectors`;

-- AddForeignKey
ALTER TABLE `Movie` ADD CONSTRAINT `Movie_directorId_fkey` FOREIGN KEY (`directorId`) REFERENCES `Director`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
