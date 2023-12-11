/*
  Warnings:

  - You are about to drop the column `user_state` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "user_state";

-- AlterTable
ALTER TABLE "UserChannel" ALTER COLUMN "ban" DROP NOT NULL,
ALTER COLUMN "mute" DROP NOT NULL;

-- DropEnum
DROP TYPE "UserStatus";
