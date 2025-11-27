-- CreateEnum
CREATE TYPE "TransporterDocumentType" AS ENUM ('BI', 'NIF', 'DRIVER_LICENSE');

-- AlterTable
ALTER TABLE "images" ADD COLUMN     "documentTypeTransporter" "TransporterDocumentType";
