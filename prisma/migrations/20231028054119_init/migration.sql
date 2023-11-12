/*
  Warnings:

  - Added the required column `username` to the `Rental` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rental" ADD COLUMN     "username" TEXT NOT NULL;
