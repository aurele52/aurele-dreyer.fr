/*
  Warnings:

  - You are about to drop the column `blocked_by` on the `Friendship` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user1_id,user2_id]` on the table `Friendship` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[achievement,user_id]` on the table `UserAchievement` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Friendship" DROP COLUMN "blocked_by";

-- CreateTable
CREATE TABLE "FriendRequest" (
    "id" SERIAL NOT NULL,
    "sender_id" INTEGER NOT NULL,
    "receiver_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FriendRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blocklist" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "blocked_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Blocklist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FriendRequest_sender_id_receiver_id_key" ON "FriendRequest"("sender_id", "receiver_id");

-- CreateIndex
CREATE UNIQUE INDEX "Blocklist_user_id_blocked_id_key" ON "Blocklist"("user_id", "blocked_id");

-- CreateIndex
CREATE UNIQUE INDEX "Friendship_user1_id_user2_id_key" ON "Friendship"("user1_id", "user2_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserAchievement_achievement_user_id_key" ON "UserAchievement"("achievement", "user_id");

-- AddForeignKey
ALTER TABLE "FriendRequest" ADD CONSTRAINT "FriendRequest_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FriendRequest" ADD CONSTRAINT "FriendRequest_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blocklist" ADD CONSTRAINT "Blocklist_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blocklist" ADD CONSTRAINT "Blocklist_blocked_id_fkey" FOREIGN KEY ("blocked_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
