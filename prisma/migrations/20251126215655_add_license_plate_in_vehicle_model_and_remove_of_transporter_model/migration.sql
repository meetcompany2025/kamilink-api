/*
  Warnings:

  - You are about to drop the column `licensePlate` on the `transporters` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[licensePlate]` on the table `vehicles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `licensePlate` to the `vehicles` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "transporters_licensePlate_key";

-- AlterTable
ALTER TABLE "transporters" DROP COLUMN "licensePlate";

-- AlterTable
ALTER TABLE "vehicles" ADD COLUMN     "licensePlate" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_licensePlate_key" ON "vehicles"("licensePlate");
