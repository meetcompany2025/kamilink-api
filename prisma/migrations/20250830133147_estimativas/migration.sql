/*
  Warnings:

  - Changed the type of `estimatedTime` on the `freights` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "freights" DROP COLUMN "estimatedTime",
ADD COLUMN     "estimatedTime" DOUBLE PRECISION NOT NULL;
