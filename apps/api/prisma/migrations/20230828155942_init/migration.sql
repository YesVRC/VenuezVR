-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "auth";

-- CreateTable
CREATE TABLE "auth"."User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashPass" TEXT NOT NULL,
    "iat" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "uat" TIMESTAMP(3)
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "auth"."User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "auth"."User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "auth"."User"("email");
