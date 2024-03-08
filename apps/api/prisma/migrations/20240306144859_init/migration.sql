-- CreateTable
CREATE TABLE "Word" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "eng" TEXT NOT NULL,
    "fr" TEXT NOT NULL,
    "hint" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 0,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);
