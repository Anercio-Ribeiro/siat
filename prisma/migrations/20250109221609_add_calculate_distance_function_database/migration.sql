/*
  Warnings:

  - You are about to drop the column `tipoAluguel` on the `Imovel` table. All the data in the column will be lost.
  - You are about to drop the column `imovelId` on the `Proximidade` table. All the data in the column will be lost.
  - You are about to drop the `Utilizador` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `atualizadoEm` to the `Imagem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `garagem` to the `Imovel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `Imovel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Imovel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `municipio` to the `Imovel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `atualizadoEm` to the `Proximidade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `Proximidade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Proximidade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `Proximidade` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Aluguel" DROP CONSTRAINT "Aluguel_inquilinoId_fkey";

-- DropForeignKey
ALTER TABLE "Imovel" DROP CONSTRAINT "Imovel_proprietarioId_fkey";

-- DropForeignKey
ALTER TABLE "Proximidade" DROP CONSTRAINT "Proximidade_imovelId_fkey";

-- AlterTable
ALTER TABLE "Imagem" ADD COLUMN     "atualizadoEm" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Imovel" DROP COLUMN "tipoAluguel",
ADD COLUMN     "garagem" INTEGER NOT NULL,
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "municipio" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Proximidade" DROP COLUMN "imovelId",
ADD COLUMN     "atualizadoEm" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "tipo" TEXT NOT NULL;

-- DropTable
DROP TABLE "Utilizador";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favoritos" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Favoritos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Favoritos" ADD CONSTRAINT "Favoritos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Imovel" ADD CONSTRAINT "Imovel_proprietarioId_fkey" FOREIGN KEY ("proprietarioId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aluguel" ADD CONSTRAINT "Aluguel_inquilinoId_fkey" FOREIGN KEY ("inquilinoId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
