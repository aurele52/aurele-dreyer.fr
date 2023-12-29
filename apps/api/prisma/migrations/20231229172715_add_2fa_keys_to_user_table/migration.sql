/*
  Warnings:

  - A unique constraint covering the columns `[secret_2fa]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email_42]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email_42` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secret_2fa` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "email_42" TEXT NOT NULL,
ADD COLUMN     "secret_2fa" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_secret_2fa_key" ON "User"("secret_2fa");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_42_key" ON "User"("email_42");
