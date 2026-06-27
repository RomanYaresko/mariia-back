-- AlterTable
ALTER TABLE "mariia_steps" ADD COLUMN     "foundGiftButtonText" TEXT,
ADD COLUMN     "giftName" TEXT,
ADD COLUMN     "isGift" BOOLEAN NOT NULL DEFAULT false;
