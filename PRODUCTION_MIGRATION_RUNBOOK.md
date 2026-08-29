# ISR Website 2.0 — Production Migration Runbook

## Status

Prepared only. Production execution is NOT authorised by this document.

No production migration, main merge, deployment, DNS change, or Supabase production change is approved yet.

## Release order

1. Approve an exact Git release SHA.
2. Confirm production hosting and environment variables.
3. Confirm current Supabase backup capability.
4. Create a fresh logical PostgreSQL backup.
5. Validate the backup archive and record its SHA-256.
6. Run the guarded Prisma migration procedure.
7. Confirm Prisma migration status.
8. Verify existing data and new prayer records.
9. Deploy backend.
10. Smoke-test backend APIs.
11. Deploy frontend.
12. Smoke-test the public website.
13. Keep rollback capability available throughout.

## Production backup

Use:

    backend/scripts/production-backup.ps1

Required environment variables:

    PRODUCTION_DATABASE_URL
    CONFIRM_ISR_RELEASE_SHA
    CONFIRM_ISR_PRODUCTION_BACKUP=YES

The backup procedure must:

- use pg_dump custom format;
- create a non-empty backup;
- validate it with pg_restore --list;
- record the backup SHA-256;
- keep the backup outside Git.

Production backup files belong in:

    .production-backups/

## Production migration

Use:

    backend/scripts/production-migrate.ps1

Required environment variables:

    PRODUCTION_DATABASE_URL
    CONFIRM_ISR_RELEASE_SHA
    ISR_BACKUP_FILE
    CONFIRM_ISR_PRODUCTION_MIGRATION=YES

The migration procedure must use:

    prisma migrate deploy

and then:

    prisma migrate status

It must NOT use:

- prisma migrate reset
- prisma db push
- prisma db seed

## Verified prayer persistence

The prepared migration includes verified persistent records for:

- City prayer space
- Bundoora East prayer space
- Bundoora West prayer space
- Brunswick prayer space
- City Jumuah
- Bundoora Jumuah

Confirmed Bundoora Jumuah operation:

- 12:30 pm outside Victorian daylight saving
- 1:30 pm during Victorian daylight saving
- sisters use 202.04.01
- sisters receive the Jumuah livestream

Calculated prayer times:

- Australia/Melbourne timezone
- Muslim World League
- AlAdhan method 3

## Pre-migration go / no-go checklist

- [ ] Exact release SHA explicitly approved
- [ ] ideas branch release candidate reviewed
- [ ] Working tree clean
- [ ] Backend tests pass
- [ ] Backend production build passes
- [ ] Frontend production build passes
- [ ] Public QA passes
- [ ] Prayer facts approved
- [ ] Current public event links verified
- [ ] Current registration links verified
- [ ] History publication decision completed
- [ ] Production environment variables confirmed
- [ ] Fresh production database backup created
- [ ] Backup archive validated
- [ ] Backup SHA-256 recorded
- [ ] Final production deployment explicitly approved

If any required item is not confirmed, STOP.

## Post-migration database verification

- [ ] Prisma reports all migrations applied
- [ ] Existing Event records remain present
- [ ] Existing Announcement records remain present
- [ ] Existing published Events remain publicly visible
- [ ] Existing published Announcements remain publicly visible
- [ ] Program tables exist
- [ ] PrayerSpace table exists
- [ ] JumuahService table exists
- [ ] Four verified PrayerSpace records exist
- [ ] Two verified JumuahService records exist

## Backend smoke tests

- [ ] Backend starts successfully
- [ ] Prayer-times API responds
- [ ] Prayer-info API responds
- [ ] Events API responds
- [ ] Announcements API responds
- [ ] Programs API responds
- [ ] Admin authentication works

## Public website smoke tests

- [ ] Home
- [ ] Pray
- [ ] Events
- [ ] Event detail
- [ ] Programs
- [ ] Program detail where applicable
- [ ] Updates
- [ ] Campuses
- [ ] Student Guide
- [ ] Support
- [ ] Join
- [ ] Find
- [ ] FAQ
- [ ] Mobile navigation
- [ ] Website tour
- [ ] Prayer times
- [ ] City Jumuah
- [ ] Bundoora Jumuah
- [ ] No draft content exposed publicly

## Failure / rollback rule

If a production migration or release step fails:

1. Stop the release.
2. Preserve the exact terminal output.
3. Preserve the release SHA.
4. Preserve the backup path and SHA-256.
5. Identify whether the migration actually applied.
6. Do not blindly rerun migrations.
7. Do not run db push, migrate reset, or destructive SQL.
8. Decide separately whether application rollback or database recovery is required.

A database restore is a separate high-impact production action and requires explicit approval.

## Secrets cleanup

After the production session remove:

    PRODUCTION_DATABASE_URL
    CONFIRM_ISR_RELEASE_SHA
    CONFIRM_ISR_PRODUCTION_BACKUP
    CONFIRM_ISR_PRODUCTION_MIGRATION
    ISR_BACKUP_FILE

Never commit production secrets or database dumps.

## Current status

NO PRODUCTION MIGRATION.
NO MAIN MERGE.
NO DEPLOYMENT.

Next checkpoint: final go / no-go audit and production-environment verification.
