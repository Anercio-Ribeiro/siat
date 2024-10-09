/*
  Warnings:

  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Aula` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Aviso` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Disciplina` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Estudante` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Evento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Exame` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Presenca` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Professor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Responsavel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Resultado` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tarefa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Turma` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DisciplinaToProfessor` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('INQUILINO', 'PROPRIETARIO', 'ADMIN');

-- CreateEnum
CREATE TYPE "TipoAluguel" AS ENUM ('RESIDENCIAL', 'TURISTICO');

-- DropForeignKey
ALTER TABLE "Aula" DROP CONSTRAINT "Aula_disciplinaId_fkey";

-- DropForeignKey
ALTER TABLE "Aula" DROP CONSTRAINT "Aula_professorId_fkey";

-- DropForeignKey
ALTER TABLE "Aula" DROP CONSTRAINT "Aula_turmaId_fkey";

-- DropForeignKey
ALTER TABLE "Aviso" DROP CONSTRAINT "Aviso_turmaId_fkey";

-- DropForeignKey
ALTER TABLE "Estudante" DROP CONSTRAINT "Estudante_responsavelId_fkey";

-- DropForeignKey
ALTER TABLE "Estudante" DROP CONSTRAINT "Estudante_turmaId_fkey";

-- DropForeignKey
ALTER TABLE "Evento" DROP CONSTRAINT "Evento_turmaId_fkey";

-- DropForeignKey
ALTER TABLE "Exame" DROP CONSTRAINT "Exame_aulaId_fkey";

-- DropForeignKey
ALTER TABLE "Presenca" DROP CONSTRAINT "Presenca_aulaId_fkey";

-- DropForeignKey
ALTER TABLE "Presenca" DROP CONSTRAINT "Presenca_estudanteId_fkey";

-- DropForeignKey
ALTER TABLE "Resultado" DROP CONSTRAINT "Resultado_estudanteId_fkey";

-- DropForeignKey
ALTER TABLE "Resultado" DROP CONSTRAINT "Resultado_exameId_fkey";

-- DropForeignKey
ALTER TABLE "Resultado" DROP CONSTRAINT "Resultado_tarefaId_fkey";

-- DropForeignKey
ALTER TABLE "Tarefa" DROP CONSTRAINT "Tarefa_aulaId_fkey";

-- DropForeignKey
ALTER TABLE "Turma" DROP CONSTRAINT "Turma_supervisorId_fkey";

-- DropForeignKey
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_estudanteId_fkey";

-- DropForeignKey
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_professorId_fkey";

-- DropForeignKey
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_responsavelId_fkey";

-- DropForeignKey
ALTER TABLE "_DisciplinaToProfessor" DROP CONSTRAINT "_DisciplinaToProfessor_A_fkey";

-- DropForeignKey
ALTER TABLE "_DisciplinaToProfessor" DROP CONSTRAINT "_DisciplinaToProfessor_B_fkey";

-- DropTable
DROP TABLE "Admin";

-- DropTable
DROP TABLE "Aula";

-- DropTable
DROP TABLE "Aviso";

-- DropTable
DROP TABLE "Disciplina";

-- DropTable
DROP TABLE "Estudante";

-- DropTable
DROP TABLE "Evento";

-- DropTable
DROP TABLE "Exame";

-- DropTable
DROP TABLE "Presenca";

-- DropTable
DROP TABLE "Professor";

-- DropTable
DROP TABLE "Responsavel";

-- DropTable
DROP TABLE "Resultado";

-- DropTable
DROP TABLE "Tarefa";

-- DropTable
DROP TABLE "Turma";

-- DropTable
DROP TABLE "Usuario";

-- DropTable
DROP TABLE "_DisciplinaToProfessor";

-- DropEnum
DROP TYPE "RoleUsuario";

-- DropEnum
DROP TYPE "SexoUsuario";

-- CreateTable
CREATE TABLE "Utilizador" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "favoritoIds" TEXT[],
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Utilizador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Imovel" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "tipoAluguel" "TipoAluguel" NOT NULL,
    "proprietarioId" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "provincia" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "numeroQuarto" INTEGER NOT NULL,
    "numeroCasaBanho" INTEGER NOT NULL,
    "tipologia" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Imovel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Imagem" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "imovelId" TEXT NOT NULL,

    CONSTRAINT "Imagem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contrato" (
    "id" TEXT NOT NULL,
    "aluguelId" TEXT NOT NULL,
    "dataInicio" TIMESTAMP(3) NOT NULL,
    "dataFim" TIMESTAMP(3) NOT NULL,
    "valorTotal" DOUBLE PRECISION NOT NULL,
    "termosContrato" TEXT NOT NULL,
    "urlDocumento" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contrato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aluguel" (
    "id" TEXT NOT NULL,
    "imovelId" TEXT NOT NULL,
    "inquilinoId" TEXT NOT NULL,
    "periodoAluguel" INTEGER NOT NULL,
    "contratoUrl" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Aluguel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proximidade" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "distancia" DOUBLE PRECISION NOT NULL,
    "imovelId" TEXT NOT NULL,

    CONSTRAINT "Proximidade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Utilizador_email_key" ON "Utilizador"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Contrato_aluguelId_key" ON "Contrato"("aluguelId");

-- AddForeignKey
ALTER TABLE "Imovel" ADD CONSTRAINT "Imovel_proprietarioId_fkey" FOREIGN KEY ("proprietarioId") REFERENCES "Utilizador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Imagem" ADD CONSTRAINT "Imagem_imovelId_fkey" FOREIGN KEY ("imovelId") REFERENCES "Imovel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contrato" ADD CONSTRAINT "Contrato_aluguelId_fkey" FOREIGN KEY ("aluguelId") REFERENCES "Aluguel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aluguel" ADD CONSTRAINT "Aluguel_imovelId_fkey" FOREIGN KEY ("imovelId") REFERENCES "Imovel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aluguel" ADD CONSTRAINT "Aluguel_inquilinoId_fkey" FOREIGN KEY ("inquilinoId") REFERENCES "Utilizador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proximidade" ADD CONSTRAINT "Proximidade_imovelId_fkey" FOREIGN KEY ("imovelId") REFERENCES "Imovel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
