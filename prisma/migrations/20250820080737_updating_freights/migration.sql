/*
  Warnings:

  - Added the required column `hasInsurance` to the `freights` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requiresLoadingHelp` to the `freights` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requiresUnloadingHelp` to the `freights` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "freights" ADD COLUMN     "hasInsurance" BOOLEAN NOT NULL,
ADD COLUMN     "requiresLoadingHelp" BOOLEAN NOT NULL,
ADD COLUMN     "requiresUnloadingHelp" BOOLEAN NOT NULL;
