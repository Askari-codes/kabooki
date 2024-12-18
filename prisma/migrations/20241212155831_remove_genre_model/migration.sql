/*
  Warnings:

  - You are about to drop the column `genreId` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `picture_url` on the `book` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `book` table. All the data in the column will be lost.
  - You are about to drop the `genre` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `writer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `genre` to the `book` table without a default value. This is not possible if the table is not empty.
  - Made the column `publishedAt` on table `book` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `slug` to the `writer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `book` DROP FOREIGN KEY `Book_genreId_fkey`;

-- DropForeignKey
ALTER TABLE `book` DROP FOREIGN KEY `Book_writerId_fkey`;

-- AlterTable
ALTER TABLE `book` DROP COLUMN `genreId`,
    DROP COLUMN `picture_url`,
    DROP COLUMN `rating`,
    ADD COLUMN `cover_url` VARCHAR(255) NULL,
    ADD COLUMN `genre` VARCHAR(100) NOT NULL,
    ADD COLUMN `summary` TEXT NULL,
    MODIFY `publishedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `writer` ADD COLUMN `slug` VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE `genre`;

-- CreateIndex
CREATE UNIQUE INDEX `Writer_slug_key` ON `writer`(`slug`);

-- AddForeignKey
ALTER TABLE `book` ADD CONSTRAINT `book_writerId_fkey` FOREIGN KEY (`writerId`) REFERENCES `writer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
