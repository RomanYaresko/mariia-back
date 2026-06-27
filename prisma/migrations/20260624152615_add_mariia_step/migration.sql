-- CreateTable
CREATE TABLE "mariia_steps" (
    "id" SERIAL NOT NULL,
    "isHead" BOOLEAN NOT NULL DEFAULT false,
    "title" TEXT,
    "description" TEXT,
    "buttonText" TEXT NOT NULL,
    "nextId" INTEGER,
    "prevId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mariia_steps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "mariia_steps_nextId_key" ON "mariia_steps"("nextId");

-- CreateIndex
CREATE UNIQUE INDEX "mariia_steps_prevId_key" ON "mariia_steps"("prevId");

-- AddForeignKey
ALTER TABLE "mariia_steps" ADD CONSTRAINT "mariia_steps_nextId_fkey" FOREIGN KEY ("nextId") REFERENCES "mariia_steps"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
