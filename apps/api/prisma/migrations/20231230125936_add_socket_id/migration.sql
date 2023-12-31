/*
  Warnings:

  - A unique constraint covering the columns `[socked_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "socked_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_socked_id_key" ON "User"("socked_id");
