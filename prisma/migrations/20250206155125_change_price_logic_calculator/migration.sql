/*
  Warnings:

  - Added the required column `tipoAluguel` to the `Imovel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Imovel" ADD COLUMN     "precoMensal" DOUBLE PRECISION,
ADD COLUMN     "tipoAluguel" "TipoAluguel" NOT NULL;
