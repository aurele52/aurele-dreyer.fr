/*
  Warnings:

  - A unique constraint covering the columns `[auth42_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[token]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `token` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "token" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_auth42_id_key" ON "User"("auth42_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_token_key" ON "User"("token");
