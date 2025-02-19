-- CreateTable
CREATE TABLE `Podcast` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `genre` VARCHAR(100) NOT NULL,
    `publishedAt` DATETIME(3) NOT NULL,
    `summary` TEXT NULL,
    `cover_url` VARCHAR(255) NULL,
    `hostId` INTEGER NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `rating` INTEGER NOT NULL,
    `min_price` DOUBLE NOT NULL,

    UNIQUE INDEX `Podcast_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Host` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `picture_url` VARCHAR(255) NULL,
    `country` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `Host_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserFavoritePodcast` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rating` DOUBLE NULL,
    `comment` TEXT NULL,
    `userId` INTEGER NOT NULL,
    `podcastId` INTEGER NOT NULL,

    UNIQUE INDEX `UserFavoritePodcast_userId_podcastId_key`(`userId`, `podcastId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Podcast` ADD CONSTRAINT `Podcast_hostId_fkey` FOREIGN KEY (`hostId`) REFERENCES `Host`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserFavoritePodcast` ADD CONSTRAINT `UserFavoritePodcast_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserFavoritePodcast` ADD CONSTRAINT `UserFavoritePodcast_podcastId_fkey` FOREIGN KEY (`podcastId`) REFERENCES `Podcast`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
