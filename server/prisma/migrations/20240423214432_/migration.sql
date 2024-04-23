/*
  Warnings:

  - You are about to drop the `SavedYelpBusiness` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SavedYelpBusinessToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_SavedYelpBusinessToUser" DROP CONSTRAINT "_SavedYelpBusinessToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_SavedYelpBusinessToUser" DROP CONSTRAINT "_SavedYelpBusinessToUser_B_fkey";

-- DropTable
DROP TABLE "SavedYelpBusiness";

-- DropTable
DROP TABLE "_SavedYelpBusinessToUser";

-- CreateTable
CREATE TABLE "SavedBusiness" (
    "id" SERIAL NOT NULL,
    "business_id" VARCHAR(50) NOT NULL,

    CONSTRAINT "SavedBusiness_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SavedBusinessToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "saved_business_id" ON "SavedBusiness"("business_id");

-- CreateIndex
CREATE UNIQUE INDEX "_SavedBusinessToUser_AB_unique" ON "_SavedBusinessToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SavedBusinessToUser_B_index" ON "_SavedBusinessToUser"("B");

-- AddForeignKey
ALTER TABLE "_SavedBusinessToUser" ADD CONSTRAINT "_SavedBusinessToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "SavedBusiness"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SavedBusinessToUser" ADD CONSTRAINT "_SavedBusinessToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
