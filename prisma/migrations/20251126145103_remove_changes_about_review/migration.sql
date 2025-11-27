/*
  Warnings:

  - You are about to drop the column `authorId` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `reviewType` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `targetUserId` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `reviews` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_authorId_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_freightId_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_targetUserId_fkey";

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "authorId",
DROP COLUMN "reviewType",
DROP COLUMN "targetUserId",
DROP COLUMN "updatedAt";

-- DropEnum
DROP TYPE "ReviewType";

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_freightId_fkey" FOREIGN KEY ("freightId") REFERENCES "freights"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
