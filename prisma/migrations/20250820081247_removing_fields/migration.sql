/*
  Warnings:

  - You are about to drop the column `extraServices` on the `freights` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleTypes` on the `transporters` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "freights" DROP COLUMN "extraServices";

-- AlterTable
ALTER TABLE "transporters" DROP COLUMN "vehicleTypes";
