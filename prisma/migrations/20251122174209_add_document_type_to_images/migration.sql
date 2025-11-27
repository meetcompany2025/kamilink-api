-- CreateEnum
CREATE TYPE "VehicleDocumentType" AS ENUM ('TITLE', 'INSURANCE', 'IPO', 'IVM');

-- AlterTable
ALTER TABLE "images" ADD COLUMN     "documentType" "VehicleDocumentType";
