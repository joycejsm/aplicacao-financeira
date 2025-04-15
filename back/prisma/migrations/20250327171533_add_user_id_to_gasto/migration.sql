/*
  Warnings:

  - Added the required column `userId` to the `Gasto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gasto" ADD COLUMN     "userId" INTEGER NOT NULL;
