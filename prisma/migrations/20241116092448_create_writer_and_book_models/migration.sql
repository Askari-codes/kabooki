-- CreateTable
CREATE TABLE `Writer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `picture_url` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Book` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `genre` VARCHAR(100) NULL,
    `publishedAt` DATETIME(3) NULL,
    `picture_url` VARCHAR(191) NULL,
    `writerId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Book` ADD CONSTRAINT `Book_writerId_fkey` FOREIGN KEY (`writerId`) REFERENCES `Writer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
