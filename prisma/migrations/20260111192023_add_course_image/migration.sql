/*
  Warnings:

  - Added the required column `Order` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "Order" INTEGER NOT NULL;
