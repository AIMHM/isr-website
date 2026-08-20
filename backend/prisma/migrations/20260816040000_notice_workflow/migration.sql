-- ISR Website 2.0 Notice / ISR Update workflow
-- SOURCE ONLY. This migration is not executed by this script.

ALTER TABLE "Announcement"
ADD COLUMN "scope" TEXT NOT NULL DEFAULT 'general',
ADD COLUMN "campus" TEXT,
ADD COLUMN "audience" TEXT,
ADD COLUMN "publicationStatus" TEXT NOT NULL DEFAULT 'draft',
ADD COLUMN "contentOwner" TEXT,
ADD COLUMN "reviewedAt" TIMESTAMP(3);

-- Existing notices pre-date the editorial workflow.
-- Preserve their current public visibility when this migration
-- is eventually reviewed and deliberately executed.
UPDATE "Announcement"
SET "publicationStatus" = 'published';

CREATE INDEX "Announcement_publicationStatus_idx"
ON "Announcement"("publicationStatus");

CREATE INDEX "Announcement_scope_idx"
ON "Announcement"("scope");

CREATE INDEX "Announcement_campus_idx"
ON "Announcement"("campus");
