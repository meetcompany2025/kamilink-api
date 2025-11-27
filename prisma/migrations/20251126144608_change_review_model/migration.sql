/*
  Warnings:

  - Added the required column `authorId` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetUserId` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ReviewType" AS ENUM ('FREIGHT', 'TRANSPORTER');

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_freightId_fkey";

-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "reviewType" "ReviewType" NOT NULL DEFAULT 'FREIGHT',
ADD COLUMN     "targetUserId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_freightId_fkey" FOREIGN KEY ("freightId") REFERENCES "freights"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_targetUserId_fkey" FOREIGN KEY ("targetUserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
