-- AlterTable
ALTER TABLE "Gasto" ADD COLUMN     "beneficiarioId" INTEGER,
ADD COLUMN     "payerId" INTEGER;

-- CreateTable
CREATE TABLE "GastoCompartilhado" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "gastoId" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'Pendente',

    CONSTRAINT "GastoCompartilhado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Amizade" (
    "id" TEXT NOT NULL,
    "user1Id" INTEGER NOT NULL,
    "user2Id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'Aceito',

    CONSTRAINT "Amizade_pkey" PRIMARY KEY ("id")
);
