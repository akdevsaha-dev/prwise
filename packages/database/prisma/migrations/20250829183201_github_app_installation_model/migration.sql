-- AlterTable
ALTER TABLE "public"."user" ADD COLUMN     "plan" "public"."Plan" NOT NULL DEFAULT 'FREE';

-- CreateTable
CREATE TABLE "public"."GithubAppInstallation" (
    "id" TEXT NOT NULL,
    "installationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "workspaceId" TEXT NOT NULL,

    CONSTRAINT "GithubAppInstallation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GithubAppInstallation_installationId_key" ON "public"."GithubAppInstallation"("installationId");

-- CreateIndex
CREATE UNIQUE INDEX "GithubAppInstallation_workspaceId_key" ON "public"."GithubAppInstallation"("workspaceId");

-- AddForeignKey
ALTER TABLE "public"."GithubAppInstallation" ADD CONSTRAINT "GithubAppInstallation_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "public"."workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
