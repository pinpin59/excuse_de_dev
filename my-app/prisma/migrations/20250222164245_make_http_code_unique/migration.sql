/*
  Warnings:

  - A unique constraint covering the columns `[http_code]` on the table `Excuse` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Excuse_http_code_key" ON "Excuse"("http_code");
