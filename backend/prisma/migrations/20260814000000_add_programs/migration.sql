-- ISR Website 2.0 Programs
-- Source migration only in Batch 2B1.
-- DO NOT apply to production without explicit approval.

CREATE TABLE "Program" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    "campusId" TEXT NOT NULL,
    "campusLabel" TEXT NOT NULL,
    "venue" TEXT NOT NULL,
    "audience" TEXT NOT NULL,

    "weekday" INTEGER NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "intervalWeeks" INTEGER NOT NULL DEFAULT 1,

    "activeFrom" TIMESTAMP(3) NOT NULL,
    "activeUntil" TIMESTAMP(3) NOT NULL,

    "registrationMode" TEXT NOT NULL DEFAULT 'none',
    "registrationUrl" TEXT,
    "price" TEXT,

    "status" TEXT NOT NULL DEFAULT 'active',
    "publicationStatus" TEXT NOT NULL DEFAULT 'published',

    "imageUrl" TEXT,

    "contentOwner" TEXT,
    "lastReviewedAt" TIMESTAMP(3),
    "reviewDueAt" TIMESTAMP(3),

    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Program_pkey"
      PRIMARY KEY ("id")
);

CREATE TABLE "ProgramException" (
    "id" SERIAL NOT NULL,
    "programId" INTEGER NOT NULL,

    "date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "startTime" TEXT,
    "endTime" TEXT,
    "venue" TEXT,
    "note" TEXT,

    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProgramException_pkey"
      PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX
  "Program_slug_key"
ON
  "Program"("slug");

CREATE INDEX
  "Program_status_idx"
ON
  "Program"("status");

CREATE INDEX
  "Program_publicationStatus_idx"
ON
  "Program"("publicationStatus");

CREATE INDEX
  "Program_campusId_idx"
ON
  "Program"("campusId");

CREATE INDEX
  "Program_activeFrom_activeUntil_idx"
ON
  "Program"("activeFrom", "activeUntil");

CREATE UNIQUE INDEX
  "ProgramException_programId_date_key"
ON
  "ProgramException"("programId", "date");

CREATE INDEX
  "ProgramException_date_idx"
ON
  "ProgramException"("date");

ALTER TABLE
  "ProgramException"
ADD CONSTRAINT
  "ProgramException_programId_fkey"
FOREIGN KEY
  ("programId")
REFERENCES
  "Program"("id")
ON DELETE CASCADE
ON UPDATE CASCADE;
