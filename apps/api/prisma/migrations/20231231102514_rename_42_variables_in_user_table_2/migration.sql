/*
  Warnings:

  - You are about to drop the column `auth42_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id_42]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[token_42]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_auth42_id_key";

-- DropIndex
DROP INDEX "User_secret_2fa_key";

-- DropIndex
DROP INDEX "User_token_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "auth42_id",
DROP COLUMN "token",
ADD COLUMN     "id_42" INTEGER,
ADD COLUMN     "token_42" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_id_42_key" ON "User"("id_42");

-- CreateIndex
CREATE UNIQUE INDEX "User_token_42_key" ON "User"("token_42");
