-- DropForeignKey
ALTER TABLE `book` DROP FOREIGN KEY `book_writerId_fkey`;

-- AlterTable
ALTER TABLE `userfavoritebook` MODIFY `comment` TEXT NULL;

-- AddForeignKey
ALTER TABLE `book` ADD CONSTRAINT `book_writerId_fkey` FOREIGN KEY (`writerId`) REFERENCES `writer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
