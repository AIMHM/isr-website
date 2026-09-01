import {
  Request,
  Response,
} from "express";
import {
  prisma,
} from "../lib/prisma";

const READINESS_TIMEOUT_MS = 2_000;

async function checkDatabaseReadiness(): Promise<void> {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  try {
    const timeoutPromise = new Promise<never>((_, reject) => {
      timeout = setTimeout(() => {
        reject(
          new Error(
            "Database readiness check timed out",
          ),
        );
      }, READINESS_TIMEOUT_MS);
    });

    await Promise.race([
      prisma.$queryRaw`SELECT 1`,
      timeoutPromise,
    ]);
  }
  finally {
    if (timeout) {
      clearTimeout(timeout);
    }
  }
}

export const getReadiness = async (
  _req: Request,
  res: Response,
) => {
  res.set(
    "Cache-Control",
    "no-store",
  );

  try {
    await checkDatabaseReadiness();

    res.status(200).json({
      status: "ready",
    });
  }
  catch {
    res.status(503).json({
      status: "unavailable",
    });
  }
};
