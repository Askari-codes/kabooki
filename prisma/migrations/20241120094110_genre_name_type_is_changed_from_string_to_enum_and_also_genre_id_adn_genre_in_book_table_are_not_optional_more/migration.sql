/*
  Warnings:

  - You are about to alter the column `name` on the `genre` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - Made the column `genreId` on table `book` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `book` DROP FOREIGN KEY `Book_genreId_fkey`;

-- AlterTable
ALTER TABLE `book` MODIFY `genreId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `genre` MODIFY `name` ENUM('DETECTIVE', 'HISTORICAL', 'ROMANTIC', 'COMEDY', 'WAR') NOT NULL;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_genreId_fkey` FOREIGN KEY (`genreId`) REFERENCES `Genre`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
