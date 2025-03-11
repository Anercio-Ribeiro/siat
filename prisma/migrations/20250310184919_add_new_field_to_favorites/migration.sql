/*
  Warnings:

  - Added the required column `countFavoritos` to the `Favoritos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Favoritos" ADD COLUMN     "countFavoritos" INTEGER NOT NULL;
