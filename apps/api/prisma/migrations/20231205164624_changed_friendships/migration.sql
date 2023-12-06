/*
  Warnings:

  - You are about to drop the column `blockey_by` on the `Friendship` table. All the data in the column will be lost.
  - You are about to drop the column `player1_score` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `player2_score` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `matchId` on the `MatchPlayer` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `MatchPlayer` table. All the data in the column will be lost.
  - You are about to drop the `UserFriendships` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_id,match_id]` on the table `MatchPlayer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user1_id` to the `Friendship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user2_id` to the `Friendship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `match_id` to the `MatchPlayer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `MatchPlayer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `winner` to the `MatchPlayer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MatchPlayer" DROP CONSTRAINT "MatchPlayer_matchId_fkey";

-- DropForeignKey
ALTER TABLE "MatchPlayer" DROP CONSTRAINT "MatchPlayer_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserFriendships" DROP CONSTRAINT "UserFriendships_friendshipId_fkey";

-- DropForeignKey
ALTER TABLE "UserFriendships" DROP CONSTRAINT "UserFriendships_userId_fkey";

-- DropIndex
DROP INDEX "MatchPlayer_userId_matchId_key";

-- AlterTable
ALTER TABLE "Friendship" DROP COLUMN "blockey_by",
ADD COLUMN     "blocked_by" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "user1_id" INTEGER NOT NULL,
ADD COLUMN     "user2_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Match" DROP COLUMN "player1_score",
DROP COLUMN "player2_score",
ALTER COLUMN "on_going" SET DEFAULT true;

-- AlterTable
ALTER TABLE "MatchPlayer" DROP COLUMN "matchId",
DROP COLUMN "userId",
ADD COLUMN     "match_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL,
ADD COLUMN     "winner" BOOLEAN NOT NULL;

-- DropTable
DROP TABLE "UserFriendships";

-- CreateIndex
CREATE UNIQUE INDEX "MatchPlayer_user_id_match_id_key" ON "MatchPlayer"("user_id", "match_id");

-- AddForeignKey
ALTER TABLE "MatchPlayer" ADD CONSTRAINT "MatchPlayer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchPlayer" ADD CONSTRAINT "MatchPlayer_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_user1_id_fkey" FOREIGN KEY ("user1_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_user2_id_fkey" FOREIGN KEY ("user2_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
