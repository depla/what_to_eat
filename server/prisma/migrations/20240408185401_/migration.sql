-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(320) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "liked_yelp_business" (
    "id" SERIAL NOT NULL,
    "liked_business_id" VARCHAR(50) NOT NULL,

    CONSTRAINT "liked_yelp_business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "disliked_yelp_business" (
    "id" SERIAL NOT NULL,
    "disliked_business_id" VARCHAR(50) NOT NULL,

    CONSTRAINT "disliked_yelp_business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_liked_yelp_businessTouser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_disliked_yelp_businessTouser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "email" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "liked_business_id" ON "liked_yelp_business"("liked_business_id");

-- CreateIndex
CREATE UNIQUE INDEX "disliked_business_id" ON "disliked_yelp_business"("disliked_business_id");

-- CreateIndex
CREATE UNIQUE INDEX "_liked_yelp_businessTouser_AB_unique" ON "_liked_yelp_businessTouser"("A", "B");

-- CreateIndex
CREATE INDEX "_liked_yelp_businessTouser_B_index" ON "_liked_yelp_businessTouser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_disliked_yelp_businessTouser_AB_unique" ON "_disliked_yelp_businessTouser"("A", "B");

-- CreateIndex
CREATE INDEX "_disliked_yelp_businessTouser_B_index" ON "_disliked_yelp_businessTouser"("B");

-- AddForeignKey
ALTER TABLE "_liked_yelp_businessTouser" ADD CONSTRAINT "_liked_yelp_businessTouser_A_fkey" FOREIGN KEY ("A") REFERENCES "liked_yelp_business"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_liked_yelp_businessTouser" ADD CONSTRAINT "_liked_yelp_businessTouser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_disliked_yelp_businessTouser" ADD CONSTRAINT "_disliked_yelp_businessTouser_A_fkey" FOREIGN KEY ("A") REFERENCES "disliked_yelp_business"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_disliked_yelp_businessTouser" ADD CONSTRAINT "_disliked_yelp_businessTouser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
