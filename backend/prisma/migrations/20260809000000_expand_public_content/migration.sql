-- Prepared locally for review.
-- DO NOT apply to production without a database backup and deployment plan.

ALTER TABLE "Event"
ADD COLUMN "endDate" TIMESTAMP(3),
ADD COLUMN "venue" TEXT,
ADD COLUMN "campus" TEXT,
ADD COLUMN "audience" TEXT,
ADD COLUMN "price" TEXT,
ADD COLUMN "accessibility" TEXT,
ADD COLUMN "status" TEXT NOT NULL DEFAULT 'scheduled',
ADD COLUMN "statusNote" TEXT;

CREATE INDEX "Event_date_idx" ON "Event"("date");
CREATE INDEX "Event_status_idx" ON "Event"("status");

ALTER TABLE "Announcement"
ADD COLUMN "priority" TEXT NOT NULL DEFAULT 'normal',
ADD COLUMN "expiresAt" TIMESTAMP(3),
ADD COLUMN "actionLabel" TEXT,
ADD COLUMN "actionUrl" TEXT;

CREATE INDEX "Announcement_createdAt_idx"
ON "Announcement"("createdAt");

CREATE INDEX "Announcement_expiresAt_idx"
ON "Announcement"("expiresAt");
