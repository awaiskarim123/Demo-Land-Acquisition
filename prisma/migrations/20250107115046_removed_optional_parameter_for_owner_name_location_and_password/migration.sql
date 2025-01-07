/*
  Warnings:

  - Made the column `ownerName` on table `LandParcel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `location` on table `LandParcel` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "LandParcel" ALTER COLUMN "ownerName" SET NOT NULL,
ALTER COLUMN "location" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" SET NOT NULL;
