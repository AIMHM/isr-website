-- ISR Website 2.0 Event persistence
-- SOURCE ONLY: this migration is not executed by this script.

ALTER TABLE "Event"
ADD COLUMN "registrationMode" TEXT NOT NULL DEFAULT 'unknown',
ADD COLUMN "category" TEXT,
ADD COLUMN "contentOwner" TEXT,
ADD COLUMN "reviewedAt" TIMESTAMP(3);

ALTER TABLE "Event"
ALTER COLUMN "imageUrl" DROP NOT NULL;

CREATE INDEX "Event_registrationMode_idx"
ON "Event"("registrationMode");