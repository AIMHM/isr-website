export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'

const DEFAULT_API_TIMEOUT_MS = 10_000

export async function fetchWithTimeout(
  input: RequestInfo | URL,
  init?: RequestInit,
  timeoutMs: number = DEFAULT_API_TIMEOUT_MS,
): Promise<Response> {
  const controller = new AbortController()
  const externalSignal = init?.signal

  const abortFromExternalSignal = () => {
    controller.abort()
  }

  if (externalSignal?.aborted) {
    controller.abort()
  } else {
    externalSignal?.addEventListener(
      'abort',
      abortFromExternalSignal,
      { once: true },
    )
  }

  const timeout = setTimeout(() => {
    controller.abort()
  }, timeoutMs)

  try {
    return await fetch(input, {
      ...init,
      signal: controller.signal,
    })
  } finally {
    clearTimeout(timeout)
    externalSignal?.removeEventListener(
      'abort',
      abortFromExternalSignal,
    )
  }
}
