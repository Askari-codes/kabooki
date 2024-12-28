/*
  Warnings:

  - Added the required column `is_free` to the `book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `min_price` to the `book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `book` ADD COLUMN `is_free` BOOLEAN NOT NULL,
    ADD COLUMN `min_price` DOUBLE NOT NULL;
