-- AlterTable
ALTER TABLE "public"."GithubAppInstallation" ADD COLUMN     "accountLogin" TEXT NOT NULL DEFAULT 'unknown',
ADD COLUMN     "accountType" TEXT NOT NULL DEFAULT 'User';
