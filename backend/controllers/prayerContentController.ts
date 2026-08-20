import {
  Request,
  Response,
} from "express";
import {
  prisma,
} from "../lib/prisma";

const PUBLICATION_STATUSES =
  new Set([
    "draft",
    "review",
    "published",
    "archived",
  ]);

const VERIFICATION_STATUSES =
  new Set([
    "verified",
    "needs-review",
    "temporary",
  ]);

function stringValue(
  value: unknown,
): string {
  return typeof value === "string"
    ? value.trim()
    : "";
}

function nullableString(
  value: unknown,
): string | null {
  return (
    stringValue(value) ||
    null
  );
}

function optionalDate(
  value: unknown,
): Date | null | undefined {
  if (
    value === undefined
  ) {
    return undefined;
  }

  const normalized =
    stringValue(value);

  if (!normalized) {
    return null;
  }

  const parsed =
    new Date(normalized);

  if (
    Number.isNaN(
      parsed.getTime(),
    )
  ) {
    return undefined;
  }

  return parsed;
}

function serialize(
  record: any,
) {
  return {
    ...record,

    reviewedAt:
      record.reviewedAt
        ?.toISOString() ??
      null,

    reviewDueAt:
      record.reviewDueAt
        ?.toISOString() ??
      null,

    createdAt:
      record.createdAt
        ?.toISOString(),

    updatedAt:
      record.updatedAt
        ?.toISOString(),
  };
}

function applyGovernanceFields(
  body: any,
  data: any,
):
  | string
  | null {
  if (
    body.publicationStatus !==
    undefined
  ) {
    const value =
      stringValue(
        body.publicationStatus,
      );

    if (
      !PUBLICATION_STATUSES.has(
        value,
      )
    ) {
      return (
        "Invalid publication status"
      );
    }

    data.publicationStatus =
      value;
  }

  if (
    body.verificationStatus !==
    undefined
  ) {
    const value =
      stringValue(
        body.verificationStatus,
      );

    if (
      !VERIFICATION_STATUSES.has(
        value,
      )
    ) {
      return (
        "Invalid verification status"
      );
    }

    data.verificationStatus =
      value;
  }

  if (
    body.contentOwner !==
    undefined
  ) {
    data.contentOwner =
      nullableString(
        body.contentOwner,
      );
  }

  if (
    body.sourceLabel !==
    undefined
  ) {
    data.sourceLabel =
      nullableString(
        body.sourceLabel,
      );
  }

  if (
    body.reviewedAt !==
    undefined
  ) {
    const value =
      optionalDate(
        body.reviewedAt,
      );

    if (value === undefined) {
      return (
        "reviewedAt must be a valid date"
      );
    }

    data.reviewedAt =
      value;
  }

  if (
    body.reviewDueAt !==
    undefined
  ) {
    const value =
      optionalDate(
        body.reviewDueAt,
      );

    if (value === undefined) {
      return (
        "reviewDueAt must be a valid date"
      );
    }

    data.reviewDueAt =
      value;
  }

  return null;
}

export const getPrayerContent =
  async (
    _req: Request,
    res: Response,
  ) => {
    try {
      const [
        prayerSpaces,
        jumuahServices,
      ] =
        await Promise.all([
          prisma.prayerSpace.findMany({
            where: {
              publicationStatus:
                "published",
            },

            orderBy: [
              {
                campus:
                  "asc",
              },
              {
                name:
                  "asc",
              },
            ],
          }),

          prisma.jumuahService.findMany({
            where: {
              publicationStatus:
                "published",
            },

            orderBy: {
              campus:
                "asc",
            },
          }),
        ]);

      return res.status(200).json({
        data: {
          prayerSpaces:
            prayerSpaces.map(
              serialize,
            ),

          jumuahServices:
            jumuahServices.map(
              serialize,
            ),
        },
      });
    }
    catch (error) {
      console.error(
        "getPrayerContent failed:",
        error,
      );

      return res.status(500).json({
        error:
          "Failed to fetch prayer information",
      });
    }
  };

export const getAdminPrayerContent =
  async (
    _req: Request,
    res: Response,
  ) => {
    try {
      const [
        prayerSpaces,
        jumuahServices,
      ] =
        await Promise.all([
          prisma.prayerSpace.findMany({
            orderBy: [
              {
                campus:
                  "asc",
              },
              {
                name:
                  "asc",
              },
            ],
          }),

          prisma.jumuahService.findMany({
            orderBy: {
              campus:
                "asc",
            },
          }),
        ]);

      return res.status(200).json({
        data: {
          prayerSpaces:
            prayerSpaces.map(
              serialize,
            ),

          jumuahServices:
            jumuahServices.map(
              serialize,
            ),
        },
      });
    }
    catch (error) {
      console.error(
        "getAdminPrayerContent failed:",
        error,
      );

      return res.status(500).json({
        error:
          "Failed to fetch admin prayer information",
      });
    }
  };

export const updatePrayerSpace =
  async (
    req: Request,
    res: Response,
  ) => {
    const id =
      Number(req.params.id);

    if (
      !Number.isInteger(id)
    ) {
      return res.status(400).json({
        error:
          "Invalid prayer-space id",
      });
    }

    try {
      const existing =
        await prisma.prayerSpace.findUnique({
          where: {
            id,
          },
        });

      if (!existing) {
        return res.status(404).json({
          error:
            "Prayer space not found",
        });
      }

      const data: any = {};

      const stringFields = [
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
      ];

      for (
        const field
        of stringFields
      ) {
        if (
          req.body[field] !==
          undefined
        ) {
          const value =
            stringValue(
              req.body[field],
            );

          if (!value) {
            return res.status(400).json({
              error:
                `${field} cannot be empty`,
            });
          }

          data[field] =
            value;
        }
      }

      const governanceError =
        applyGovernanceFields(
          req.body,
          data,
        );

      if (governanceError) {
        return res.status(400).json({
          error:
            governanceError,
        });
      }

      const record =
        await prisma.prayerSpace.update({
          where: {
            id,
          },

          data,
        });

      return res.status(200).json({
        data:
          serialize(
            record,
          ),
      });
    }
    catch (error) {
      console.error(
        "updatePrayerSpace failed:",
        error,
      );

      return res.status(500).json({
        error:
          "Failed to update prayer space",
      });
    }
  };

export const updateJumuahService =
  async (
    req: Request,
    res: Response,
  ) => {
    const id =
      Number(req.params.id);

    if (
      !Number.isInteger(id)
    ) {
      return res.status(400).json({
        error:
          "Invalid Jumuah-service id",
      });
    }

    try {
      const existing =
        await prisma.jumuahService.findUnique({
          where: {
            id,
          },
        });

      if (!existing) {
        return res.status(404).json({
          error:
            "Jumuah service not found",
        });
      }

      const data: any = {};

      const requiredFields = [
        "campus",
        "venue",
        "brothers",
        "sisters",
        "notes",
        "timeRule",
      ];

      for (
        const field
        of requiredFields
      ) {
        if (
          req.body[field] !==
          undefined
        ) {
          const value =
            stringValue(
              req.body[field],
            );

          if (!value) {
            return res.status(400).json({
              error:
                `${field} cannot be empty`,
            });
          }

          data[field] =
            value;
        }
      }

      for (
        const field
        of [
          "standardTime",
          "daylightSavingTime",
        ]
      ) {
        if (
          req.body[field] !==
          undefined
        ) {
          data[field] =
            nullableString(
              req.body[field],
            );
        }
      }

      const governanceError =
        applyGovernanceFields(
          req.body,
          data,
        );

      if (governanceError) {
        return res.status(400).json({
          error:
            governanceError,
        });
      }

      const record =
        await prisma.jumuahService.update({
          where: {
            id,
          },

          data,
        });

      return res.status(200).json({
        data:
          serialize(
            record,
          ),
      });
    }
    catch (error) {
      console.error(
        "updateJumuahService failed:",
        error,
      );

      return res.status(500).json({
        error:
          "Failed to update Jumuah service",
      });
    }
  };
