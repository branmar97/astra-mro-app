/*
  Warnings:

  - You are about to drop the column `auth_id` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[supabase_id]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phone` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supabase_id` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "user_auth_id_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "auth_id",
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "supabase_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "user_supabase_id_key" ON "user"("supabase_id");
