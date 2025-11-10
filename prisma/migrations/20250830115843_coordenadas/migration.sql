/*
  Warnings:

  - Added the required column `destinationCoordinates` to the `freights` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estimatedDistance` to the `freights` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estimatedTime` to the `freights` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originCoordinates` to the `freights` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "freights" ADD COLUMN     "destinationCoordinates" TEXT NOT NULL,
ADD COLUMN     "estimatedDistance" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "estimatedTime" TEXT NOT NULL,
ADD COLUMN     "originCoordinates" TEXT NOT NULL;
