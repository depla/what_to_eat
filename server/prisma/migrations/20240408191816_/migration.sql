/*
  Warnings:

  - You are about to drop the `_disliked_yelp_businessTouser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_liked_yelp_businessTouser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `disliked_yelp_business` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `liked_yelp_business` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_disliked_yelp_businessTouser" DROP CONSTRAINT "_disliked_yelp_businessTouser_A_fkey";

-- DropForeignKey
ALTER TABLE "_disliked_yelp_businessTouser" DROP CONSTRAINT "_disliked_yelp_businessTouser_B_fkey";

-- DropForeignKey
ALTER TABLE "_liked_yelp_businessTouser" DROP CONSTRAINT "_liked_yelp_businessTouser_A_fkey";

-- DropForeignKey
ALTER TABLE "_liked_yelp_businessTouser" DROP CONSTRAINT "_liked_yelp_businessTouser_B_fkey";

-- DropTable
DROP TABLE "_disliked_yelp_businessTouser";

-- DropTable
DROP TABLE "_liked_yelp_businessTouser";

-- DropTable
DROP TABLE "disliked_yelp_business";

-- DropTable
DROP TABLE "liked_yelp_business";
