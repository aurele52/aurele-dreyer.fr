/*
  Warnings:

  - You are about to drop the column `email_42` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[secret_2fa]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_email_42_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email_42",
ALTER COLUMN "secret_2fa" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_secret_2fa_key" ON "User"("secret_2fa");
