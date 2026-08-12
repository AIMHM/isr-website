export const CAMPUS_IDS = [
  'city',
  'bundoora',
  'brunswick',
] as const

export type CampusId =
  (typeof CAMPUS_IDS)[number]

export const PUBLICATION_STATUSES = [
  'draft',
  'review',
  'published',
  'archived',
] as const

export type PublicationStatus =
  (typeof PUBLICATION_STATUSES)[number]

export type ContentReviewMetadata = {
  contentOwner?: string | null
  lastReviewedAt?: string | null
  reviewDueAt?: string | null
}

export const VERIFICATION_STATUSES = [
  'unverified',
  'needs-review',
  'verified',
  'source-conflict',
] as const

export type VerificationStatus =
  (typeof VERIFICATION_STATUSES)[number]

export type VerificationMetadata = {
  status: VerificationStatus
  sourceName?: string | null
  sourceUrl?: string | null
  verifiedAt?: string | null
  verifiedBy?: string | null
  reviewDueAt?: string | null
}
