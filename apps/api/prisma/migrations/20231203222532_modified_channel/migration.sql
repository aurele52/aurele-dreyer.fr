-- AlterTable
ALTER TABLE "Channel" ALTER COLUMN "password" DROP NOT NULL,
ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP;
