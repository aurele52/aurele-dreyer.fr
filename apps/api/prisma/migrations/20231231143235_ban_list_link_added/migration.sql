/*
  Warnings:

  - You are about to drop the column `banList` on the `Channel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Channel" DROP COLUMN "banList";

-- CreateTable
CREATE TABLE "_BannedChannels" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BannedChannels_AB_unique" ON "_BannedChannels"("A", "B");

-- CreateIndex
CREATE INDEX "_BannedChannels_B_index" ON "_BannedChannels"("B");

-- AddForeignKey
ALTER TABLE "_BannedChannels" ADD CONSTRAINT "_BannedChannels_A_fkey" FOREIGN KEY ("A") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BannedChannels" ADD CONSTRAINT "_BannedChannels_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
