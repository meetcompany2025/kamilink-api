/*
  Warnings:

  - You are about to drop the column `licensePlate` on the `vehicles` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "vehicles_licensePlate_key";

-- AlterTable
ALTER TABLE "vehicles" DROP COLUMN "licensePlate";
