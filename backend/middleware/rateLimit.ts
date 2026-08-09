import {
  RequestHandler,
} from "express";

type Options = {
  windowMs: number;
  max: number;
  message: string;
};

type Entry = {
  count: number;
  resetAt: number;
};

export function createRateLimiter({
  windowMs,
  max,
  message,
}: Options): RequestHandler {
  const store = new Map<string, Entry>();
  let requestCounter = 0;

  return (req, res, next) => {
    const now = Date.now();

    requestCounter += 1;

    if (requestCounter % 100 === 0) {
      for (const [key, entry] of store) {
        if (entry.resetAt <= now) {
          store.delete(key);
        }
      }
    }

    const key =
      req.ip ||
      req.socket.remoteAddress ||
      "unknown";

    const current = store.get(key);

    if (
      !current ||
      current.resetAt <= now
    ) {
      store.set(key, {
        count: 1,
        resetAt: now + windowMs,
      });

      next();
      return;
    }

    if (current.count >= max) {
      res.status(429).json({
        error: message,
      });

      return;
    }

    current.count += 1;
    store.set(key, current);

    next();
  };
}
