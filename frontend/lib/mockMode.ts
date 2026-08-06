export const IS_LOCAL_MOCK_DATA =
  process.env.NODE_ENV !== 'production' &&
  process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true'
