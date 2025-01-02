/*
  Warnings:

  - A unique constraint covering the columns `[userId,bookId]` on the table `UserFavoriteBook` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `UserFavoriteBook_userId_bookId_key` ON `UserFavoriteBook`(`userId`, `bookId`);
