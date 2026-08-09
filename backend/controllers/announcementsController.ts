import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import {
  uploadAnnouncementImage,
  deleteAnnouncementImage,
} from "../lib/storage";

const PRIORITIES = new Set([
  "normal",
  "important",
  "urgent",
]);

function normalizeNullableString(
  value: unknown,
): string | null {
  if (typeof value !== "string") return null;

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function safeActionUrl(value: string | null): boolean {
  if (!value) return true;

  if (
    value.startsWith("/") &&
    !value.startsWith("//")
  ) {
    return true;
  }

  try {
    const parsed = new URL(value);

    return (
      parsed.protocol === "https:" ||
      parsed.protocol === "http:"
    );
  } catch {
    return false;
  }
}

function parseExpiry(
  value: unknown,
): Date | null | undefined {
  if (value === undefined) return undefined;

  const normalized =
    normalizeNullableString(value);

  if (!normalized) return null;

  const parsed = new Date(normalized);

  if (Number.isNaN(parsed.getTime())) {
    return undefined;
  }

  return parsed;
}

export const getAnnouncements = async (
  _req: Request,
  res: Response,
) => {
  try {
    const announcements =
      await prisma.announcement.findMany({
        orderBy: [
          { pinned: "desc" },
          { createdAt: "desc" },
        ],
      });

    return res.status(200).json({
      data: announcements,
    });
  } catch (err) {
    console.error(
      "getAnnouncements failed:",
      err,
    );

    return res.status(500).json({
      error: "Failed to fetch announcements",
    });
  }
};

export const getAnnouncementById = async (
  req: Request,
  res: Response,
) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      error: "Invalid announcement id",
    });
  }

  try {
    const announcement =
      await prisma.announcement.findUnique({
        where: { id },
      });

    if (!announcement) {
      return res.status(404).json({
        error: "Announcement not found",
      });
    }

    return res.status(200).json({
      data: announcement,
    });
  } catch (err) {
    console.error(
      "getAnnouncementById failed:",
      err,
    );

    return res.status(500).json({
      error: "Failed to fetch announcement",
    });
  }
};

export const createAnnouncement = async (
  req: Request,
  res: Response,
) => {
  const title =
    normalizeNullableString(req.body.title);

  const body =
    normalizeNullableString(req.body.body);

  if (!title || !body) {
    return res.status(400).json({
      error: "title and body are required",
    });
  }

  const priority =
    normalizeNullableString(
      req.body.priority,
    ) ?? "normal";

  if (!PRIORITIES.has(priority)) {
    return res.status(400).json({
      error: "Invalid announcement priority",
    });
  }

  const expiresAt =
    parseExpiry(req.body.expiresAt);

  if (
    req.body.expiresAt !== undefined &&
    expiresAt === undefined
  ) {
    return res.status(400).json({
      error: "expiresAt must be a valid date",
    });
  }

  const actionLabel =
    normalizeNullableString(
      req.body.actionLabel,
    );

  const actionUrl =
    normalizeNullableString(
      req.body.actionUrl,
    );

  if (
    Boolean(actionLabel) !== Boolean(actionUrl)
  ) {
    return res.status(400).json({
      error:
        "actionLabel and actionUrl must be provided together",
    });
  }

  if (!safeActionUrl(actionUrl)) {
    return res.status(400).json({
      error:
        "actionUrl must be a local path, http URL or https URL",
    });
  }

  try {
    let imageUrl: string | undefined;

    if (req.file) {
      imageUrl =
        await uploadAnnouncementImage(req.file);
    }

    const announcement =
      await prisma.announcement.create({
        data: {
          title,
          body,
          pinned:
            req.body.pinned === "true" ||
            req.body.pinned === true,
          priority,
          expiresAt: expiresAt ?? null,
          actionLabel,
          actionUrl,
          ...(imageUrl !== undefined && {
            imageUrl,
          }),
        },
      });

    return res.status(201).json({
      data: announcement,
    });
  } catch (err) {
    console.error(
      "createAnnouncement failed:",
      err,
    );

    return res.status(500).json({
      error: "Failed to create announcement",
    });
  }
};

export const updateAnnouncement = async (
  req: Request,
  res: Response,
) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      error: "Invalid announcement id",
    });
  }

  try {
    const existing =
      await prisma.announcement.findUnique({
        where: { id },
      });

    if (!existing) {
      return res.status(404).json({
        error: "Announcement not found",
      });
    }

    const data: any = {};

    if (req.body.title !== undefined) {
      const value =
        normalizeNullableString(req.body.title);

      if (!value) {
        return res.status(400).json({
          error: "title cannot be empty",
        });
      }

      data.title = value;
    }

    if (req.body.body !== undefined) {
      const value =
        normalizeNullableString(req.body.body);

      if (!value) {
        return res.status(400).json({
          error: "body cannot be empty",
        });
      }

      data.body = value;
    }

    if (req.body.pinned !== undefined) {
      data.pinned =
        req.body.pinned === "true" ||
        req.body.pinned === true;
    }

    if (req.body.priority !== undefined) {
      const value =
        normalizeNullableString(
          req.body.priority,
        );

      if (!value || !PRIORITIES.has(value)) {
        return res.status(400).json({
          error: "Invalid announcement priority",
        });
      }

      data.priority = value;
    }

    if (req.body.expiresAt !== undefined) {
      const parsed =
        parseExpiry(req.body.expiresAt);

      if (parsed === undefined) {
        return res.status(400).json({
          error: "expiresAt must be a valid date",
        });
      }

      data.expiresAt = parsed;
    }

    const nextActionLabel =
      req.body.actionLabel !== undefined
        ? normalizeNullableString(
            req.body.actionLabel,
          )
        : existing.actionLabel;

    const nextActionUrl =
      req.body.actionUrl !== undefined
        ? normalizeNullableString(
            req.body.actionUrl,
          )
        : existing.actionUrl;

    if (
      Boolean(nextActionLabel) !==
      Boolean(nextActionUrl)
    ) {
      return res.status(400).json({
        error:
          "actionLabel and actionUrl must be provided together",
      });
    }

    if (!safeActionUrl(nextActionUrl)) {
      return res.status(400).json({
        error:
          "actionUrl must be a local path, http URL or https URL",
      });
    }

    if (req.body.actionLabel !== undefined) {
      data.actionLabel = nextActionLabel;
    }

    if (req.body.actionUrl !== undefined) {
      data.actionUrl = nextActionUrl;
    }

    if (req.file) {
      const newImageUrl =
        await uploadAnnouncementImage(
          req.file,
        );

      data.imageUrl = newImageUrl;

      if (existing.imageUrl) {
        await deleteAnnouncementImage(
          existing.imageUrl,
        );
      }
    }

    const announcement =
      await prisma.announcement.update({
        where: { id },
        data,
      });

    return res.status(200).json({
      data: announcement,
    });
  } catch (err) {
    console.error(
      "updateAnnouncement failed:",
      err,
    );

    return res.status(500).json({
      error: "Failed to update announcement",
    });
  }
};

export const deleteAnnouncement = async (
  req: Request,
  res: Response,
) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      error: "Invalid announcement id",
    });
  }

  try {
    const existing =
      await prisma.announcement.findUnique({
        where: { id },
      });

    if (!existing) {
      return res.status(404).json({
        error: "Announcement not found",
      });
    }

    await prisma.announcement.delete({
      where: { id },
    });

    if (existing.imageUrl) {
      await deleteAnnouncementImage(
        existing.imageUrl,
      );
    }

    return res.status(200).json({
      data: { id },
    });
  } catch (err) {
    console.error(
      "deleteAnnouncement failed:",
      err,
    );

    return res.status(500).json({
      error: "Failed to delete announcement",
    });
  }
};
