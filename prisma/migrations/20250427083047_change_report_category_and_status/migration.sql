/*
  Warnings:

  - The values [COMPLAINT,ASPIRATION,INFORMATION_REQUEST] on the enum `ReportCategory` will be removed. If these variants are still used in the database, this will fail.
  - The values [VERIFICATION_PROCESS,VERIFIED,FOLLOW_UP,COMPLETED] on the enum `ReportStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ReportCategory_new" AS ENUM ('PENGADUAN', 'ASPIRASI', 'PERMINTAAN_INFORMASI');
ALTER TABLE "Report" ALTER COLUMN "category" TYPE "ReportCategory_new" USING ("category"::text::"ReportCategory_new");
ALTER TYPE "ReportCategory" RENAME TO "ReportCategory_old";
ALTER TYPE "ReportCategory_new" RENAME TO "ReportCategory";
DROP TYPE "ReportCategory_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ReportStatus_new" AS ENUM ('PROSES_VERIFIKASI', 'TERVERIFIKASI', 'TINDAK_LANJUK', 'SELESAI');
ALTER TABLE "Report" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Report" ALTER COLUMN "status" TYPE "ReportStatus_new" USING ("status"::text::"ReportStatus_new");
ALTER TYPE "ReportStatus" RENAME TO "ReportStatus_old";
ALTER TYPE "ReportStatus_new" RENAME TO "ReportStatus";
DROP TYPE "ReportStatus_old";
ALTER TABLE "Report" ALTER COLUMN "status" SET DEFAULT 'PROSES_VERIFIKASI';
COMMIT;

-- AlterTable
ALTER TABLE "Report" ALTER COLUMN "status" SET DEFAULT 'PROSES_VERIFIKASI';
