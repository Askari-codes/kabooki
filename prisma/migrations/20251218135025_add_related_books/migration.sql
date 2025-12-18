-- CreateTable
CREATE TABLE `RelatedBook` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bookId` INTEGER NOT NULL,
    `relatedBookId` INTEGER NOT NULL,

    UNIQUE INDEX `RelatedBook_bookId_relatedBookId_key`(`bookId`, `relatedBookId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RelatedBook` ADD CONSTRAINT `RelatedBook_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RelatedBook` ADD CONSTRAINT `RelatedBook_relatedBookId_fkey` FOREIGN KEY (`relatedBookId`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
