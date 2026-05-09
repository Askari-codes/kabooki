/*
  Warnings:

  - You are about to drop the column `image` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `user_name` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_user_name_key` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `image`,
    DROP COLUMN `user_name`,
    ADD COLUMN `avatar` VARCHAR(255) NULL,
    ADD COLUMN `bio` TEXT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `location` VARCHAR(100) NULL,
    ADD COLUMN `name` VARCHAR(100) NOT NULL,
    ADD COLUMN `password` VARCHAR(255) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `username` VARCHAR(50) NOT NULL,
    MODIFY `email` VARCHAR(255) NOT NULL;

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

-- CreateIndex
CREATE UNIQUE INDEX `user_username_key` ON `User`(`username`);

-- CreateIndex
CREATE UNIQUE INDEX `user_email_key` ON `User`(`email`);

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
