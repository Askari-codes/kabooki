-- CreateTable
CREATE TABLE `Movie` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rating` DOUBLE NOT NULL,
    `genre` VARCHAR(191) NOT NULL,
    `publishedAt` DATETIME(3) NOT NULL,
    `summary` TEXT NULL,
    `poster` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `stream` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
