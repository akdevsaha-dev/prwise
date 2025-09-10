/*
  Warnings:

  - A unique constraint covering the columns `[ownerId,name]` on the table `workspace` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "workspace_ownerId_name_key" ON "public"."workspace"("ownerId", "name");
