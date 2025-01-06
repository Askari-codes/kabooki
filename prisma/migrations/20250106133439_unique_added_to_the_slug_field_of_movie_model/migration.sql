/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Movie_slug_key` ON `Movie`(`slug`);
