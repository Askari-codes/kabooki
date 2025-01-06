/*
  Warnings:

  - You are about to drop the column `MovieId` on the `userfavoritemovie` table. All the data in the column will be lost.
  - You are about to drop the column `UserId` on the `userfavoritemovie` table. All the data in the column will be lost.
  - Added the required column `movieId` to the `UserFavoriteMovie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `UserFavoriteMovie` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `userfavoritemovie` DROP FOREIGN KEY `UserFavoriteMovie_MovieId_fkey`;

-- DropForeignKey
ALTER TABLE `userfavoritemovie` DROP FOREIGN KEY `UserFavoriteMovie_UserId_fkey`;

-- AlterTable
ALTER TABLE `userfavoritemovie` DROP COLUMN `MovieId`,
    DROP COLUMN `UserId`,
    ADD COLUMN `movieId` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `UserFavoriteMovie` ADD CONSTRAINT `UserFavoriteMovie_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserFavoriteMovie` ADD CONSTRAINT `UserFavoriteMovie_movieId_fkey` FOREIGN KEY (`movieId`) REFERENCES `Movie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
