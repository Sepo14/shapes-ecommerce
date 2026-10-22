-- CreateEnum
CREATE TYPE "Tag" AS ENUM ('HOT', 'NEW', 'DISCOUNT', 'POPULAR');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "tag" "Tag";
