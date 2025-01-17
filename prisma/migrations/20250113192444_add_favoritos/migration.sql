/*
  Warnings:

  - A unique constraint covering the columns `[userId,imovelId]` on the table `Favoritos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imovelId` to the `Favoritos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Favoritos" ADD COLUMN     "imovelId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Favoritos_userId_imovelId_key" ON "Favoritos"("userId", "imovelId");

-- AddForeignKey
ALTER TABLE "Favoritos" ADD CONSTRAINT "Favoritos_imovelId_fkey" FOREIGN KEY ("imovelId") REFERENCES "Imovel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
