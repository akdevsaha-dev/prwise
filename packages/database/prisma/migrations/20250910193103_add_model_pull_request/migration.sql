-- AlterTable
ALTER TABLE "public"."workspace" ADD COLUMN     "pullRequestId" TEXT;

-- CreateTable
CREATE TABLE "public"."PullRequest" (
    "id" TEXT NOT NULL,
    "pullReqNumber" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "branch" TEXT NOT NULL,
    "baseBranch" TEXT NOT NULL,
    "repoName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "workspaceId" TEXT NOT NULL,

    CONSTRAINT "PullRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."PullRequest" ADD CONSTRAINT "PullRequest_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "public"."workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
