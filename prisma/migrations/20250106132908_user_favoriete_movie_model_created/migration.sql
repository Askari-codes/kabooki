-- CreateTable
CREATE TABLE `UserFavoriteMovie` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rating` DOUBLE NULL,
    `comment` VARCHAR(191) NULL,
    `UserId` INTEGER NOT NULL,
    `MovieId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserFavoriteMovie` ADD CONSTRAINT `UserFavoriteMovie_UserId_fkey` FOREIGN KEY (`UserId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserFavoriteMovie` ADD CONSTRAINT `UserFavoriteMovie_MovieId_fkey` FOREIGN KEY (`MovieId`) REFERENCES `Movie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
