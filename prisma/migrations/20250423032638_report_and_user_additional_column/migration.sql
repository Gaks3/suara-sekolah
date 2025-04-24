/*
  Warnings:

  - The values [USER,ADMIN] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "ReportCategory" AS ENUM ('COMPLAINT', 'ASPIRATION', 'INFORMATION_REQUEST');

-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('VERIFICATION_PROCESS', 'VERIFIED', 'FOLLOW_UP', 'COMPLETED');

-- CreateEnum
CREATE TYPE "ReportDepartment" AS ENUM ('GURU', 'TU', 'KESISWAAN', 'BK', 'KEPALA_SEKOLAH', 'BADAN_KEBERSIHAN', 'KEAMANAN', 'SARPRAS');

-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('user', 'admin');
ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "user" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "UserRole_old";
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'user';
COMMIT;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "nip" TEXT,
ADD COLUMN     "nis" TEXT,
ADD COLUMN     "phone" TEXT,
ALTER COLUMN "role" SET DEFAULT 'user';

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "anonym" BOOLEAN DEFAULT false,
    "category" "ReportCategory" NOT NULL,
    "status" "ReportStatus" NOT NULL DEFAULT 'VERIFICATION_PROCESS',
    "department" "ReportDepartment" NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
