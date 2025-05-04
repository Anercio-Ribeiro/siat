-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "TipoProximidade" ADD VALUE 'CLINICA';
ALTER TYPE "TipoProximidade" ADD VALUE 'IGREJA';
ALTER TYPE "TipoProximidade" ADD VALUE 'POSTO_DE_COMBUSTIVEL';
ALTER TYPE "TipoProximidade" ADD VALUE 'MERCADO';
ALTER TYPE "TipoProximidade" ADD VALUE 'ACADEMIA';
ALTER TYPE "TipoProximidade" ADD VALUE 'PRACA';
ALTER TYPE "TipoProximidade" ADD VALUE 'PRAIA';
ALTER TYPE "TipoProximidade" ADD VALUE 'MONTANHA';
ALTER TYPE "TipoProximidade" ADD VALUE 'RIO';
ALTER TYPE "TipoProximidade" ADD VALUE 'LAGO';
ALTER TYPE "TipoProximidade" ADD VALUE 'FLORESTA';
ALTER TYPE "TipoProximidade" ADD VALUE 'ESTADIO';
ALTER TYPE "TipoProximidade" ADD VALUE 'TEATRO';
ALTER TYPE "TipoProximidade" ADD VALUE 'MUSEU';
ALTER TYPE "TipoProximidade" ADD VALUE 'UNIVERSIDADE';
ALTER TYPE "TipoProximidade" ADD VALUE 'PARQUE_DE_DIVERSAO';
ALTER TYPE "TipoProximidade" ADD VALUE 'ZOOLOGICO';
ALTER TYPE "TipoProximidade" ADD VALUE 'CENTRO_COMERCIAL';
