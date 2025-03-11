/*
  Warnings:

  - Changed the type of `tipo` on the `Proximidade` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TipoProximidade" AS ENUM ('ESCOLA', 'HOSPITAL', 'SUPERMERCADO', 'FARMACIA', 'RESTAURANTE', 'BANCO', 'PARQUE', 'SHOPPING', 'TRANSPORTE_PUBLICO');

-- AlterTable
ALTER TABLE "Imovel" ADD COLUMN     "visualizacoes" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Proximidade" DROP COLUMN "tipo",
ADD COLUMN     "tipo" "TipoProximidade" NOT NULL;

-- CreateTable
CREATE TABLE "ProximidadeImovel" (
    "id" TEXT NOT NULL,
    "imovelId" TEXT NOT NULL,
    "proximidadeId" TEXT NOT NULL,
    "distancia" DOUBLE PRECISION NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProximidadeImovel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProximidadeImovel" ADD CONSTRAINT "ProximidadeImovel_imovelId_fkey" FOREIGN KEY ("imovelId") REFERENCES "Imovel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProximidadeImovel" ADD CONSTRAINT "ProximidadeImovel_proximidadeId_fkey" FOREIGN KEY ("proximidadeId") REFERENCES "Proximidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
