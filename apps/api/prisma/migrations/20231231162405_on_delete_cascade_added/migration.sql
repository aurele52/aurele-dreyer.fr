-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_channel_id_fkey";

-- DropForeignKey
ALTER TABLE "UserChannel" DROP CONSTRAINT "UserChannel_channel_id_fkey";

-- AddForeignKey
ALTER TABLE "UserChannel" ADD CONSTRAINT "UserChannel_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
