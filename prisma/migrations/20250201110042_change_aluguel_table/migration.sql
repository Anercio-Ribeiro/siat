/*
  Warnings:

  - Added the required column `status` to the `Aluguel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Aluguel" ADD COLUMN     "status" TEXT NOT NULL;
