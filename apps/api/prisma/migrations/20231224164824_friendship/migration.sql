/*
  Warnings:

  - You are about to drop the `Blocklist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FriendRequest` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `status` to the `Friendship` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FriendshipStatus" AS ENUM ('FRIENDS', 'PENDING', 'BLOCKED');

-- DropForeignKey
ALTER TABLE "Blocklist" DROP CONSTRAINT "Blocklist_blocked_id_fkey";

-- DropForeignKey
ALTER TABLE "Blocklist" DROP CONSTRAINT "Blocklist_user_id_fkey";

-- DropForeignKey
ALTER TABLE "FriendRequest" DROP CONSTRAINT "FriendRequest_receiver_id_fkey";

-- DropForeignKey
ALTER TABLE "FriendRequest" DROP CONSTRAINT "FriendRequest_sender_id_fkey";

-- AlterTable
ALTER TABLE "Friendship" ADD COLUMN     "status" "FriendshipStatus" NOT NULL;

-- DropTable
DROP TABLE "Blocklist";

-- DropTable
DROP TABLE "FriendRequest";
