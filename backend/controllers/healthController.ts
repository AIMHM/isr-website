import {
  Request,
  Response,
} from "express";
import {
  prisma,
} from "../lib/prisma";

const READINESS_TIMEOUT_MS = 2_000;

function readinessTimeout(): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(
        new Error(
          "Database readiness check timed out",
        ),
      );
    }, READINESS_TIMEOUT_MS);
  });
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
    await Promise.race([
      prisma.$queryRaw`SELECT 1`,
      readinessTimeout(),
    ]);

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
