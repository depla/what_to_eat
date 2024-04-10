/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(320) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedYelpBusiness" (
    "id" SERIAL NOT NULL,
    "business_id" VARCHAR(50) NOT NULL,

    CONSTRAINT "SavedYelpBusiness_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SavedYelpBusinessToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "email" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "saved_business_id" ON "SavedYelpBusiness"("business_id");

-- CreateIndex
CREATE UNIQUE INDEX "_SavedYelpBusinessToUser_AB_unique" ON "_SavedYelpBusinessToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SavedYelpBusinessToUser_B_index" ON "_SavedYelpBusinessToUser"("B");

-- AddForeignKey
ALTER TABLE "_SavedYelpBusinessToUser" ADD CONSTRAINT "_SavedYelpBusinessToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "SavedYelpBusiness"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SavedYelpBusinessToUser" ADD CONSTRAINT "_SavedYelpBusinessToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
