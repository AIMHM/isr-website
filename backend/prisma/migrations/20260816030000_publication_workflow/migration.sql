-- ISR Website 2.0 publication workflow
-- SOURCE ONLY. This migration is not executed by this script.

ALTER TABLE "Event"
ADD COLUMN "publicationStatus" TEXT NOT NULL DEFAULT 'draft';

-- Existing event records pre-date the editorial workflow.
-- Preserve their current public visibility when this migration is eventually run.
UPDATE "Event"
SET "publicationStatus" = 'published';

CREATE INDEX "Event_publicationStatus_idx"
ON "Event"("publicationStatus");

-- New recurring programs should enter the editorial workflow as drafts.
ALTER TABLE "Program"
ALTER COLUMN "publicationStatus" SET DEFAULT 'draft';
