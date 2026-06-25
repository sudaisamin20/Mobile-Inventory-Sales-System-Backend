/*
  Warnings:

  - You are about to drop the column `imei` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `storage` on the `Device` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[imei1]` on the table `Device` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `batteryHealth` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cameraCondition` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chargingCondition` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `condition` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryVersion` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `faceIdStatus` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fingerprintStatus` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imei1` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoiceNumber` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `networkLockStatus` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ptaStatus` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purchasePrice` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `screenCondition` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellingPrice` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serialNumber` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `speakerCondition` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supplierName` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tacCode` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `variant` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `warrantyDays` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Added the required column `waterpakStatus` to the `Device` table without a default value. This is not possible if the table is not empty.
  - Made the column `color` on table `Device` required. This step will fail if there are existing NULL values in that column.
  - Made the column `purchaseDate` on table `Device` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Device_imei_key";

-- AlterTable
ALTER TABLE "Device" DROP COLUMN "imei",
DROP COLUMN "status",
DROP COLUMN "storage",
ADD COLUMN     "backImage" TEXT,
ADD COLUMN     "batteryHealth" INTEGER NOT NULL,
ADD COLUMN     "cameraCondition" TEXT NOT NULL,
ADD COLUMN     "chargingCondition" TEXT NOT NULL,
ADD COLUMN     "condition" TEXT NOT NULL,
ADD COLUMN     "countryVersion" TEXT NOT NULL,
ADD COLUMN     "faceIdStatus" TEXT NOT NULL,
ADD COLUMN     "fingerprintStatus" TEXT NOT NULL,
ADD COLUMN     "frontImage" TEXT,
ADD COLUMN     "imei1" TEXT NOT NULL,
ADD COLUMN     "imei2" TEXT,
ADD COLUMN     "invoiceImage" TEXT,
ADD COLUMN     "invoiceNumber" TEXT NOT NULL,
ADD COLUMN     "networkLockStatus" TEXT NOT NULL,
ADD COLUMN     "ptaStatus" TEXT NOT NULL,
ADD COLUMN     "purchasePrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "screenCondition" TEXT NOT NULL,
ADD COLUMN     "sellingPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "serialNumber" TEXT NOT NULL,
ADD COLUMN     "speakerCondition" TEXT NOT NULL,
ADD COLUMN     "supplierName" TEXT NOT NULL,
ADD COLUMN     "tacCode" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "variant" TEXT NOT NULL,
ADD COLUMN     "warrantyDays" INTEGER NOT NULL,
ADD COLUMN     "waterpakStatus" TEXT NOT NULL,
ALTER COLUMN "color" SET NOT NULL,
ALTER COLUMN "purchaseDate" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Device_imei1_key" ON "Device"("imei1");
