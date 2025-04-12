/*
  Warnings:

  - You are about to drop the column `contratoUrl` on the `Aluguel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Aluguel" DROP COLUMN "contratoUrl",
ADD COLUMN     "valorTotal" DOUBLE PRECISION NOT NULL DEFAULT 2000;
