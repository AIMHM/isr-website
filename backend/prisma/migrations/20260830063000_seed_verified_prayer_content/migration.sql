-- ISR Website 2.0 — verified prayer content
--
-- SOURCE MIGRATION ONLY.
-- This migration has NOT been executed by this development script.
--
-- ISR operational facts confirmed on 30 August 2026.
--
-- Confirmed operational points:
-- 1. Bundoora Jumu'ah:
--    12:30 pm outside Victorian daylight saving,
--    1:30 pm during Victorian daylight saving.
-- 2. Bundoora sisters use 202.04.01 with the Jumu'ah livestream.
-- 3. Public calculated prayer times use Muslim World League /
--    AlAdhan calculation method 3.
--
-- The INSERT statements below are deliberately idempotent by slug.

INSERT INTO "PrayerSpace" (
    "slug",
    "name",
    "campus",
    "summary",
    "building",
    "room",
    "accessHours",
    "wudu",
    "brothers",
    "sisters",
    "accessibility",
    "publicationStatus",
    "verificationStatus",
    "contentOwner",
    "sourceLabel",
    "reviewedAt",
    "reviewDueAt",
    "createdAt",
    "updatedAt"
)
VALUES
(
    'city',
    'City Campus',
    'City',
    'Dedicated Islamic prayer rooms in the Multifaith and Wellbeing Centre.',
    'Building 47 — Multifaith and Wellbeing Centre',
    'Brothers: 47.02.02 • Sisters: 47.01.07',
    '12:00 pm–8:00 pm, Monday–Friday',
    'Dedicated ablution facilities are available in Building 47.',
    'Building 47, Level 2, Room 02 (47.02.02)',
    'Building 47, Level 1, Room 07 (47.01.07)',
    'Contact ISR if you need accessibility or access guidance.',
    'published',
    'verified',
    'Islamic Society of RMIT',
    'ISR operational confirmation — 30 August 2026',
    TIMESTAMP '2026-08-30 00:00:00',
    TIMESTAMP '2026-11-28 00:00:00',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
),
(
    'bundoora-east',
    'Bundoora East',
    'Bundoora',
    'Dedicated Islamic prayer rooms at Bundoora East.',
    'Building 254, Level 1',
    'Brothers: 254.1.02 • Sisters: 254.1.03',
    '9:00 am–5:00 pm, Monday–Thursday',
    'Contact ISR if you need current wudu directions.',
    'Building 254, Level 1, Room 02 (254.1.02)',
    'Building 254, Level 1, Room 03 (254.1.03)',
    'Contact ISR if you need accessibility or access guidance.',
    'published',
    'verified',
    'Islamic Society of RMIT',
    'ISR operational confirmation — 30 August 2026',
    TIMESTAMP '2026-08-30 00:00:00',
    TIMESTAMP '2026-11-28 00:00:00',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
),
(
    'bundoora-west',
    'Bundoora West',
    'Bundoora',
    'Daily prayer rooms and the Bundoora Friday prayer location.',
    'Building 202',
    'Brothers: 202.04.29 • Sisters: 202.04.01',
    '9:00 am–5:00 pm, Monday–Friday',
    'Contact ISR if you need current wudu directions.',
    'Building 202, Level 4, Room 29 (202.04.29)',
    'Building 202, Level 4, Room 01 (202.04.01)',
    'Contact ISR if you need accessibility or access guidance.',
    'published',
    'verified',
    'Islamic Society of RMIT',
    'ISR operational confirmation — 30 August 2026',
    TIMESTAMP '2026-08-30 00:00:00',
    TIMESTAMP '2026-11-28 00:00:00',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
),
(
    'brunswick',
    'Brunswick Campus',
    'Brunswick',
    'Dedicated Islamic prayer rooms at Brunswick.',
    'Building 514, Level 2',
    'Brothers: 514.2.07 • Sisters: 514.2.06',
    '9:00 am–5:00 pm, Monday–Friday',
    'Contact ISR if you need current wudu directions.',
    'Building 514, Level 2, Room 07 (514.2.07)',
    'Building 514, Level 2, Room 06 (514.2.06)',
    'Contact ISR if you need accessibility or access guidance.',
    'published',
    'verified',
    'Islamic Society of RMIT',
    'ISR operational confirmation — 30 August 2026',
    TIMESTAMP '2026-08-30 00:00:00',
    TIMESTAMP '2026-11-28 00:00:00',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
)
ON CONFLICT ("slug")
DO UPDATE SET
    "name" = EXCLUDED."name",
    "campus" = EXCLUDED."campus",
    "summary" = EXCLUDED."summary",
    "building" = EXCLUDED."building",
    "room" = EXCLUDED."room",
    "accessHours" = EXCLUDED."accessHours",
    "wudu" = EXCLUDED."wudu",
    "brothers" = EXCLUDED."brothers",
    "sisters" = EXCLUDED."sisters",
    "accessibility" = EXCLUDED."accessibility",
    "publicationStatus" = EXCLUDED."publicationStatus",
    "verificationStatus" = EXCLUDED."verificationStatus",
    "contentOwner" = EXCLUDED."contentOwner",
    "sourceLabel" = EXCLUDED."sourceLabel",
    "reviewedAt" = EXCLUDED."reviewedAt",
    "reviewDueAt" = EXCLUDED."reviewDueAt",
    "updatedAt" = CURRENT_TIMESTAMP;


INSERT INTO "JumuahService" (
    "slug",
    "campus",
    "venue",
    "brothers",
    "sisters",
    "notes",
    "timeRule",
    "standardTime",
    "daylightSavingTime",
    "publicationStatus",
    "verificationStatus",
    "contentOwner",
    "sourceLabel",
    "reviewedAt",
    "reviewDueAt",
    "createdAt",
    "updatedAt"
)
VALUES
(
    'city-jumuah',
    'City Campus',
    'Building 47',
    '47.02.02',
    '47.01.07',
    'City Jumu’ah remains at 1:30 pm throughout the year. Check ISR Updates for exceptional changes.',
    '1:30 pm year-round',
    '1:30 pm',
    '1:30 pm',
    'published',
    'verified',
    'Islamic Society of RMIT',
    'ISR operational confirmation — 30 August 2026',
    TIMESTAMP '2026-08-30 00:00:00',
    TIMESTAMP '2026-10-29 00:00:00',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
),
(
    'bundoora-jumuah',
    'Bundoora West',
    'Building 202, Level 3, Room 30 (202.03.30)',
    'Jumu’ah is held in 202.03.30.',
    'Sisters use the sisters prayer room, 202.04.01, with the Jumu’ah livestream.',
    'The Bundoora time changes with Victorian daylight saving. Check ISR Updates if you are unsure before travelling.',
    '12:30 pm outside Victorian daylight saving · 1:30 pm during daylight saving',
    '12:30 pm',
    '1:30 pm',
    'published',
    'verified',
    'Islamic Society of RMIT',
    'ISR operational confirmation — 30 August 2026',
    TIMESTAMP '2026-08-30 00:00:00',
    TIMESTAMP '2026-10-29 00:00:00',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
)
ON CONFLICT ("slug")
DO UPDATE SET
    "campus" = EXCLUDED."campus",
    "venue" = EXCLUDED."venue",
    "brothers" = EXCLUDED."brothers",
    "sisters" = EXCLUDED."sisters",
    "notes" = EXCLUDED."notes",
    "timeRule" = EXCLUDED."timeRule",
    "standardTime" = EXCLUDED."standardTime",
    "daylightSavingTime" = EXCLUDED."daylightSavingTime",
    "publicationStatus" = EXCLUDED."publicationStatus",
    "verificationStatus" = EXCLUDED."verificationStatus",
    "contentOwner" = EXCLUDED."contentOwner",
    "sourceLabel" = EXCLUDED."sourceLabel",
    "reviewedAt" = EXCLUDED."reviewedAt",
    "reviewDueAt" = EXCLUDED."reviewDueAt",
    "updatedAt" = CURRENT_TIMESTAMP;
