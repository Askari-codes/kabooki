-- CreateTable
CREATE TABLE `RelatedWriters` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `writer_id_1` INTEGER NOT NULL,
    `writer_id_2` INTEGER NOT NULL,
    `relationType` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `RelatedWriters_writer_id_1_writer_id_2_key`(`writer_id_1`, `writer_id_2`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RelatedWriters` ADD CONSTRAINT `RelatedWriters_writer_id_1_fkey` FOREIGN KEY (`writer_id_1`) REFERENCES `Writer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RelatedWriters` ADD CONSTRAINT `RelatedWriters_writer_id_2_fkey` FOREIGN KEY (`writer_id_2`) REFERENCES `Writer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
