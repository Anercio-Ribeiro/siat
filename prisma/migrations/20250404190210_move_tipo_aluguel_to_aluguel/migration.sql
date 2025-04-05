/*
  Warnings:

  - You are about to drop the column `tipoAluguel` on the `Imovel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Aluguel" ADD COLUMN     "tipoAluguel" "TipoAluguel" NOT NULL DEFAULT 'RESIDENCIAL';

-- AlterTable
ALTER TABLE "Imovel" DROP COLUMN "tipoAluguel";
