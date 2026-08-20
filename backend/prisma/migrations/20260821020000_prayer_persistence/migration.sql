-- ISR Website 2.0 — Prayer persistence foundation
-- SOURCE ONLY. This migration is NOT executed by this script.

CREATE TABLE "PrayerSpace" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "campus" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "building" TEXT NOT NULL,
    "room" TEXT NOT NULL,
    "accessHours" TEXT NOT NULL,
    "wudu" TEXT NOT NULL,
    "brothers" TEXT NOT NULL,
    "sisters" TEXT NOT NULL,
    "accessibility" TEXT NOT NULL,
    "publicationStatus" TEXT NOT NULL DEFAULT 'draft',
    "verificationStatus" TEXT NOT NULL DEFAULT 'needs-review',
    "contentOwner" TEXT,
    "sourceLabel" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "reviewDueAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrayerSpace_pkey"
        PRIMARY KEY ("id")
);

CREATE TABLE "JumuahService" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "campus" TEXT NOT NULL,
    "venue" TEXT NOT NULL,
    "brothers" TEXT NOT NULL,
    "sisters" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "timeRule" TEXT NOT NULL,
    "standardTime" TEXT,
    "daylightSavingTime" TEXT,
    "publicationStatus" TEXT NOT NULL DEFAULT 'draft',
    "verificationStatus" TEXT NOT NULL DEFAULT 'needs-review',
    "contentOwner" TEXT,
    "sourceLabel" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "reviewDueAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JumuahService_pkey"
        PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "PrayerSpace_slug_key"
ON "PrayerSpace"("slug");

CREATE INDEX "PrayerSpace_campus_idx"
ON "PrayerSpace"("campus");

CREATE INDEX "PrayerSpace_publicationStatus_idx"
ON "PrayerSpace"("publicationStatus");

CREATE INDEX "PrayerSpace_verificationStatus_idx"
ON "PrayerSpace"("verificationStatus");

CREATE INDEX "PrayerSpace_reviewDueAt_idx"
ON "PrayerSpace"("reviewDueAt");

CREATE UNIQUE INDEX "JumuahService_slug_key"
ON "JumuahService"("slug");

CREATE INDEX "JumuahService_campus_idx"
ON "JumuahService"("campus");

CREATE INDEX "JumuahService_publicationStatus_idx"
ON "JumuahService"("publicationStatus");

CREATE INDEX "JumuahService_verificationStatus_idx"
ON "JumuahService"("verificationStatus");

CREATE INDEX "JumuahService_reviewDueAt_idx"
ON "JumuahService"("reviewDueAt");
