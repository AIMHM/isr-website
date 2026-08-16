import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import {
  uploadEventImage,
  deleteEventImage,
} from "../lib/storage";

const EVENT_STATUSES = new Set([
  "scheduled",
  "sold-out",
  "postponed",
  "cancelled",
  "completed",
]);

const EVENT_REGISTRATION_MODES = new Set([
  "none",
  "required",
  "optional",
  "closed",
  "unknown",
]);

function normalizeNullableString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function normalizeTicketUrl(value: unknown): string | null {
  return normalizeNullableString(value);
}

function isSafeHttpUrl(value: string | null): boolean {
  if (!value) return true;

  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

function parseOptionalDate(value: unknown): Date | null | undefined {
  if (value === undefined) return undefined;

  const normalized = normalizeNullableString(value);
  if (!normalized) return null;

  const parsed = new Date(normalized);
  if (Number.isNaN(parsed.getTime())) return undefined;

  return parsed;
}

export const getEvents = async (req: Request, res: Response) => {
  const filter = req.query.filter;
  const now = new Date();

  const where =
    filter === "upcoming"
      ? {
          AND: [
            { status: { not: "completed" } },
            {
              OR: [
                { endDate: { gte: now } },
                {
                  AND: [
                    { endDate: null },
                    { date: { gte: now } },
                  ],
                },
              ],
            },
          ],
        }
      : filter === "past"
        ? {
            OR: [
              { status: "completed" },
              { endDate: { lt: now } },
              {
                AND: [
                  { endDate: null },
                  { date: { lt: now } },
                ],
              },
            ],
          }
        : undefined;

  try {
    const events = await prisma.event.findMany({
      where,
      orderBy: {
        date: filter === "past" ? "desc" : "asc",
      },
    });

    if (!where) {
      const upcoming = events.filter((event) => {
        const effectiveEnd = event.endDate ?? event.date;

        return (
          event.status !== "completed" &&
          effectiveEnd >= now
        );
      });

      const past = events
        .filter((event) => {
          const effectiveEnd = event.endDate ?? event.date;

          return (
            event.status === "completed" ||
            effectiveEnd < now
          );
        })
        .sort(
          (a, b) =>
            b.date.getTime() - a.date.getTime(),
        );

      return res.status(200).json({
        data: [...upcoming, ...past],
      });
    }

    return res.status(200).json({ data: events });
  } catch (err) {
    console.error("getEvents failed:", err);

    return res
      .status(500)
      .json({ error: "Failed to fetch events" });
  }
};

export const getEventById = async (
  req: Request,
  res: Response,
) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      error: "Invalid event id",
    });
  }

  try {
    const event = await prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      return res.status(404).json({
        error: "Event not found",
      });
    }

    return res.status(200).json({ data: event });
  } catch (err) {
    console.error("getEventById failed:", err);

    return res
      .status(500)
      .json({ error: "Failed to fetch event" });
  }
};

export const createEvent = async (
  req: Request,
  res: Response,
) => {
  const {
    name,
    date,
    endDate,
    description,
    ticketUrl,
    venue,
    campus,
    audience,
    price,
    accessibility,
    status,
    statusNote,
    registrationMode,
    category,
    contentOwner,
    reviewedAt,
  } = req.body;

  const normalizedName =
    normalizeNullableString(name);

  const normalizedDescription =
    normalizeNullableString(description);

  if (!normalizedName || !date || !normalizedDescription) {
    return res.status(400).json({
      error: "name, date and description are required",
    });
  }

  const startDate = new Date(date);

  if (Number.isNaN(startDate.getTime())) {
    return res.status(400).json({
      error: "date must be a valid date",
    });
  }

  const normalizedEndDate =
    normalizeNullableString(endDate);

  let parsedEndDate: Date | null = null;

  if (normalizedEndDate) {
    parsedEndDate = new Date(normalizedEndDate);

    if (Number.isNaN(parsedEndDate.getTime())) {
      return res.status(400).json({
        error: "endDate must be a valid date",
      });
    }

    if (parsedEndDate < startDate) {
      return res.status(400).json({
        error: "endDate cannot be before date",
      });
    }
  }

  const normalizedTicketUrl =
    normalizeTicketUrl(ticketUrl);

  if (!isSafeHttpUrl(normalizedTicketUrl)) {
    return res.status(400).json({
      error: "ticketUrl must use http or https",
    });
  }

  const normalizedStatus =
    normalizeNullableString(status) ?? "scheduled";

  if (!EVENT_STATUSES.has(normalizedStatus)) {
    return res.status(400).json({
      error: "Invalid event status",
    });
  }

  const normalizedRegistrationMode =
    normalizeNullableString(registrationMode) ??
    "unknown";

  if (
    !EVENT_REGISTRATION_MODES.has(
      normalizedRegistrationMode,
    )
  ) {
    return res.status(400).json({
      error: "Invalid registration mode",
    });
  }

  if (
    normalizedRegistrationMode === "required" &&
    !normalizedTicketUrl
  ) {
    return res.status(400).json({
      error:
        "Registration URL is required when registration is required",
    });
  }

  const parsedReviewedAt =
    parseOptionalDate(reviewedAt);

  if (
    reviewedAt !== undefined &&
    parsedReviewedAt === undefined
  ) {
    return res.status(400).json({
      error: "reviewedAt must be a valid date",
    });
  }

  try {
    const imageUrl =
      req.file
        ? await uploadEventImage(req.file)
        : null;

    const event = await prisma.event.create({
      data: {
        name: normalizedName,
        date: startDate,
        endDate: parsedEndDate,
        description: normalizedDescription,
        ticketUrl: normalizedTicketUrl,
        registrationMode:
          normalizedRegistrationMode,
        category:
          normalizeNullableString(category),
        contentOwner:
          normalizeNullableString(contentOwner),
        reviewedAt:
          parsedReviewedAt ?? null,
        imageUrl,
        venue: normalizeNullableString(venue),
        campus: normalizeNullableString(campus),
        audience: normalizeNullableString(audience),
        price: normalizeNullableString(price),
        accessibility:
          normalizeNullableString(accessibility),
        status: normalizedStatus,
        statusNote:
          normalizeNullableString(statusNote),
      },
    });

    return res.status(201).json({ data: event });
  } catch (err) {
    console.error("createEvent failed:", err);

    return res.status(500).json({
      error: "Failed to create event",
    });
  }
};

export const updateEvent = async (
  req: Request,
  res: Response,
) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      error: "Invalid event id",
    });
  }

  try {
    const existing = await prisma.event.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({
        error: "Event not found",
      });
    }

    const data: any = {};

    if (req.body.name !== undefined) {
      const value =
        normalizeNullableString(req.body.name);

      if (!value) {
        return res.status(400).json({
          error: "name cannot be empty",
        });
      }

      data.name = value;
    }

    let nextStartDate = existing.date;

    if (req.body.date !== undefined) {
      const parsed = new Date(req.body.date);

      if (Number.isNaN(parsed.getTime())) {
        return res.status(400).json({
          error: "date must be a valid date",
        });
      }

      data.date = parsed;
      nextStartDate = parsed;
    }

    if (req.body.endDate !== undefined) {
      const parsed =
        parseOptionalDate(req.body.endDate);

      if (parsed === undefined) {
        return res.status(400).json({
          error: "endDate must be a valid date",
        });
      }

      if (parsed && parsed < nextStartDate) {
        return res.status(400).json({
          error: "endDate cannot be before date",
        });
      }

      data.endDate = parsed;
    }

    if (req.body.description !== undefined) {
      const value =
        normalizeNullableString(
          req.body.description,
        );

      if (!value) {
        return res.status(400).json({
          error: "description cannot be empty",
        });
      }

      data.description = value;
    }

    if (req.body.ticketUrl !== undefined) {
      const value =
        normalizeTicketUrl(req.body.ticketUrl);

      if (!isSafeHttpUrl(value)) {
        return res.status(400).json({
          error: "ticketUrl must use http or https",
        });
      }

      data.ticketUrl = value;
    }

    for (const field of [
      "venue",
      "campus",
      "audience",
      "price",
      "accessibility",
      "statusNote",
    ]) {
      if (req.body[field] !== undefined) {
        data[field] =
          normalizeNullableString(req.body[field]);
      }
    }

    if (req.body.status !== undefined) {
      const value =
        normalizeNullableString(req.body.status);

      if (!value || !EVENT_STATUSES.has(value)) {
        return res.status(400).json({
          error: "Invalid event status",
        });
      }

      data.status = value;
    }

    if (
      req.body.registrationMode !== undefined
    ) {
      const value =
        normalizeNullableString(
          req.body.registrationMode,
        ) ?? "unknown";

      if (
        !EVENT_REGISTRATION_MODES.has(value)
      ) {
        return res.status(400).json({
          error: "Invalid registration mode",
        });
      }

      const effectiveTicketUrl =
        data.ticketUrl !== undefined
          ? data.ticketUrl
          : existing.ticketUrl;

      if (
        value === "required" &&
        !effectiveTicketUrl
      ) {
        return res.status(400).json({
          error:
            "Registration URL is required when registration is required",
        });
      }

      data.registrationMode = value;
    }

    if (req.body.category !== undefined) {
      data.category =
        normalizeNullableString(
          req.body.category,
        );
    }

    if (
      req.body.contentOwner !== undefined
    ) {
      data.contentOwner =
        normalizeNullableString(
          req.body.contentOwner,
        );
    }

    if (
      req.body.reviewedAt !== undefined
    ) {
      const value =
        parseOptionalDate(
          req.body.reviewedAt,
        );

      if (value === undefined) {
        return res.status(400).json({
          error:
            "reviewedAt must be a valid date",
        });
      }

      data.reviewedAt = value;
    }

    if (req.file) {
      const newImageUrl =
        await uploadEventImage(req.file);

      data.imageUrl = newImageUrl;

      if (existing.imageUrl) {
        await deleteEventImage(existing.imageUrl);
      }
    }

    const event = await prisma.event.update({
      where: { id },
      data,
    });

    return res.status(200).json({ data: event });
  } catch (err) {
    console.error("updateEvent failed:", err);

    return res.status(500).json({
      error: "Failed to update event",
    });
  }
};

export const deleteEvent = async (
  req: Request,
  res: Response,
) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      error: "Invalid event id",
    });
  }

  try {
    const existing = await prisma.event.findUnique({
      where: { id },
    });

    if (!existing) {
      return res.status(404).json({
        error: "Event not found",
      });
    }

    await prisma.event.delete({
      where: { id },
    });

    if (existing.imageUrl) {
      await deleteEventImage(existing.imageUrl);
    }

    return res.status(200).json({
      data: { id },
    });
  } catch (err) {
    console.error("deleteEvent failed:", err);

    return res.status(500).json({
      error: "Failed to delete event",
    });
  }
};
