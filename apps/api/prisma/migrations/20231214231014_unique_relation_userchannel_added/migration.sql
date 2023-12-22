/*
  Warnings:

  - A unique constraint covering the columns `[user_id,channel_id]` on the table `UserChannel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserChannel_user_id_channel_id_key" ON "UserChannel"("user_id", "channel_id");
