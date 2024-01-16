-- CreateEnum
CREATE TYPE "MatchType" AS ENUM ('NORMAL', 'CUSTOM', 'PRIVATE');

-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "type" "MatchType" NOT NULL DEFAULT 'NORMAL';
