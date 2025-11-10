-- CreateTable
CREATE TABLE "TokenReset" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "TokenReset_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TokenReset" ADD CONSTRAINT "TokenReset_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
