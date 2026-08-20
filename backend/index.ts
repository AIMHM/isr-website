import "dotenv/config";
import express, {
  ErrorRequestHandler,
} from "express";
import cors from "cors";

import prayerTimesRouter from "./routes/prayerTimes";
import authRouter from "./routes/auth";
import eventsRouter from "./routes/events";
import programsRouter from "./routes/programs";
import contactRouter from "./routes/contact";
import weatherRouter from "./routes/weather";
import announcementsRouter from "./routes/announcements";
import prayerContentRouter from "./routes/prayerContent";

import {
  createRateLimiter,
} from "./middleware/rateLimit";

const app = express();

const port =
  process.env.PORT ?? 3001;

const defaultOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

const allowedOrigins = new Set(
  (
    process.env.CORS_ALLOWED_ORIGINS ??
    defaultOrigins.join(",")
  )
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
);

app.disable("x-powered-by");

app.use(
  cors({
    origin(origin, callback) {
      if (
        !origin ||
        allowedOrigins.has(origin)
      ) {
        callback(null, true);
        return;
      }

      callback(
        new Error(
          "Origin not allowed by CORS",
        ),
      );
    },

    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  }),
);

app.use(
  express.json({
    limit: "1mb",
  }),
);

const signInLimiter =
  createRateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message:
      "Too many sign-in attempts. Please try again later.",
  });

const contactLimiter =
  createRateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message:
      "Too many contact requests. Please try again later.",
  });

app.get(
  "/health",
  (_req, res) => {
    res.status(200).send("OK");
  },
);

app.use(
  "/api/auth/signin",
  signInLimiter,
);

app.use(
  "/api/contact",
  contactLimiter,
);

app.use(
  "/api/prayer-times",
  prayerTimesRouter,
);

app.use(
  "/api/auth",
  authRouter,
);

app.use(
  "/api/events",
  eventsRouter,
);

app.use(
  "/api/programs",
  programsRouter,
);

app.use(
  "/api/contact",
  contactRouter,
);

app.use(
  "/api/weather",
  weatherRouter,
);

app.use(
  "/api/announcements",
  announcementsRouter,
);

app.use(
  "/api/prayer-info",
  prayerContentRouter,
);

const errorHandler: ErrorRequestHandler = (
  err,
  _req,
  res,
  _next,
) => {
  if (
    err instanceof Error &&
    err.message ===
      "Origin not allowed by CORS"
  ) {
    res.status(403).json({
      error: "Origin not allowed",
    });

    return;
  }

  if (
    err instanceof Error &&
    err.message ===
      "Only JPEG, PNG and WebP images are allowed"
  ) {
    res.status(400).json({
      error: err.message,
    });

    return;
  }

  if (
    err &&
    typeof err === "object" &&
    "name" in err &&
    err.name === "MulterError"
  ) {
    res.status(400).json({
      error: "Invalid image upload",
    });

    return;
  }

  console.error(
    "Unhandled API error:",
    err,
  );

  res.status(500).json({
    error: "Internal server error",
  });
};

app.use(errorHandler);

app.listen(
  port,
  () => {
    console.log(
      `Server running on port ${port}`,
    );
  },
);
