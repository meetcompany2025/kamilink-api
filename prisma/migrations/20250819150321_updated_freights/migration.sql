/*
  Warnings:

  - You are about to drop the column `cancelledAt` on the `freights` table. All the data in the column will be lost.
  - You are about to drop the column `cargoDescription` on the `freights` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Tracking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethod` to the `freights` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "freights" DROP CONSTRAINT "freights_vehicleId_fkey";

-- AlterTable
ALTER TABLE "Tracking" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "freights" DROP COLUMN "cancelledAt",
DROP COLUMN "cargoDescription",
ADD COLUMN     "cancelationReason" TEXT,
ADD COLUMN     "canceledAt" TIMESTAMP(3),
ADD COLUMN     "paymentMethod" TEXT NOT NULL,
ALTER COLUMN "vehicleId" DROP NOT NULL,
ALTER COLUMN "price" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "freights" ADD CONSTRAINT "freights_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
