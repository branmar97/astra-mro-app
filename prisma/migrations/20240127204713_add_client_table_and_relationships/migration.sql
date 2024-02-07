/*
  Warnings:

  - A unique constraint covering the columns `[client_id,identifier]` on the table `asset` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `client_id` to the `asset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `client_id` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "asset_identifier_key";

-- AlterTable
ALTER TABLE "asset" ADD COLUMN     "client_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "client_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "client" (
    "client_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "primary_email" TEXT NOT NULL,
    "primary_phone" TEXT NOT NULL,

    CONSTRAINT "client_pkey" PRIMARY KEY ("client_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "asset_client_id_identifier_key" ON "asset"("client_id", "identifier");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("client_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asset" ADD CONSTRAINT "asset_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "client"("client_id") ON DELETE RESTRICT ON UPDATE CASCADE;
