import {
  Request,
  Response,
} from "express";
import {
  prisma,
} from "../lib/prisma";

const PROGRAM_STATUSES =
  new Set([
    "active",
    "paused",
    "ended",
  ]);

const PUBLICATION_STATUSES =
  new Set([
    "draft",
    "review",
    "published",
    "archived",
  ]);

const REGISTRATION_MODES =
  new Set([
    "none",
    "required",
    "optional",
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
  const normalized =
    stringValue(value);

  return normalized || null;
}

function validDate(
  value: string,
): Date | null {
  const parsed =
    new Date(value);

  return Number.isNaN(
    parsed.getTime(),
  )
    ? null
    : parsed;
}

function serializeProgram(
  program: any,
) {
  return {
    ...program,

    id:
      String(program.id),

    activeFrom:
      program.activeFrom
        .toISOString()
        .slice(0, 10),

    activeUntil:
      program.activeUntil
        .toISOString()
        .slice(0, 10),

    lastReviewedAt:
      program.lastReviewedAt
        ?.toISOString() ??
      null,

    reviewDueAt:
      program.reviewDueAt
        ?.toISOString() ??
      null,

    exceptions:
      program.exceptions.map(
        (exception: any) => ({
          date:
            exception.date
              .toISOString()
              .slice(0, 10),

          status:
            exception.status,

          startTime:
            exception.startTime ??
            undefined,

          endTime:
            exception.endTime ??
            undefined,

          venue:
            exception.venue ??
            undefined,

          note:
            exception.note ??
            undefined,
        }),
      ),
  };
}

export const getPrograms =
  async (
    _req: Request,
    res: Response,
  ) => {
    try {
      const programs =
        await prisma.program.findMany({
          include: {
            exceptions: {
              orderBy: {
                date: "asc",
              },
            },
          },

          orderBy: [
            {
              publicationStatus:
                "asc",
            },
            {
              name:
                "asc",
            },
          ],
        });

      return res.status(200).json({
        data:
          programs.map(
            serializeProgram,
          ),
      });
    }
    catch (error) {
      console.error(
        "getPrograms failed:",
        error,
      );

      return res.status(500).json({
        error:
          "Failed to fetch programs",
      });
    }
  };

export const getProgramBySlug =
  async (
    req: Request,
    res: Response,
  ) => {
    try {
      const program =
        await prisma.program.findUnique({
          where: {
            slug:
              req.params.slug,
          },

          include: {
            exceptions: {
              orderBy: {
                date:
                  "asc",
              },
            },
          },
        });

      if (!program) {
        return res.status(404).json({
          error:
            "Program not found",
        });
      }

      return res.status(200).json({
        data:
          serializeProgram(
            program,
          ),
      });
    }
    catch (error) {
      console.error(
        "getProgramBySlug failed:",
        error,
      );

      return res.status(500).json({
        error:
          "Failed to fetch program",
      });
    }
  };

function parseProgramBody(
  body: any,
) {
  const name =
    stringValue(body.name);

  const slug =
    stringValue(body.slug);

  const summary =
    stringValue(body.summary);

  const description =
    stringValue(
      body.description,
    );

  const category =
    stringValue(body.category);

  const campusId =
    stringValue(body.campusId);

  const campusLabel =
    stringValue(
      body.campusLabel,
    );

  const venue =
    stringValue(body.venue);

  const audience =
    stringValue(body.audience);

  const startTime =
    stringValue(body.startTime);

  const endTime =
    stringValue(body.endTime);

  const weekday =
    Number(body.weekday);

  const intervalWeeks =
    Number(
      body.intervalWeeks,
    );

  const activeFrom =
    validDate(
      stringValue(
        body.activeFrom,
      ),
    );

  const activeUntil =
    validDate(
      stringValue(
        body.activeUntil,
      ),
    );

  const registrationMode =
    stringValue(
      body.registrationMode,
    ) || "none";

  const status =
    stringValue(
      body.status,
    ) || "active";

  const publicationStatus =
    stringValue(
      body.publicationStatus,
    ) || "published";

  if (
    !name ||
    !slug ||
    !summary ||
    !description ||
    !category ||
    !campusId ||
    !campusLabel ||
    !venue ||
    !audience ||
    !startTime ||
    !endTime ||
    !activeFrom ||
    !activeUntil
  ) {
    throw new Error(
      "Required program fields are missing",
    );
  }

  if (
    !Number.isInteger(
      weekday,
    ) ||
    weekday < 0 ||
    weekday > 6
  ) {
    throw new Error(
      "Weekday must be between 0 and 6",
    );
  }

  if (
    intervalWeeks !== 1 &&
    intervalWeeks !== 2
  ) {
    throw new Error(
      "Interval must be weekly or fortnightly",
    );
  }

  if (
    activeUntil.getTime() <
    activeFrom.getTime()
  ) {
    throw new Error(
      "Program end date cannot be before start date",
    );
  }

  if (
    !PROGRAM_STATUSES.has(
      status,
    )
  ) {
    throw new Error(
      "Invalid program status",
    );
  }

  if (
    !PUBLICATION_STATUSES.has(
      publicationStatus,
    )
  ) {
    throw new Error(
      "Invalid publication status",
    );
  }

  if (
    !REGISTRATION_MODES.has(
      registrationMode,
    )
  ) {
    throw new Error(
      "Invalid registration mode",
    );
  }

  const registrationUrl =
    nullableString(
      body.registrationUrl,
    );

  if (
    registrationMode ===
      "required" &&
    !registrationUrl
  ) {
    throw new Error(
      "Registration URL is required when registration is required",
    );
  }

  const exceptions =
    Array.isArray(
      body.exceptions,
    )
      ? body.exceptions
      : [];

  return {
    name,
    slug,
    summary,
    description,
    category,
    campusId,
    campusLabel,
    venue,
    audience,
    weekday,
    startTime,
    endTime,
    intervalWeeks,
    activeFrom,
    activeUntil,
    registrationMode,
    registrationUrl,
    price:
      nullableString(
        body.price,
      ),
    status,
    publicationStatus,
    contentOwner:
      nullableString(
        body.contentOwner,
      ),
    reviewDueAt:
      body.reviewDueAt
        ? validDate(
            stringValue(
              body.reviewDueAt,
            ),
          )
        : null,
    exceptions,
  };
}

export const createProgram =
  async (
    req: Request,
    res: Response,
  ) => {
    try {
      const parsed =
        parseProgramBody(
          req.body,
        );

      const program =
        await prisma.program.create({
          data: {
            ...parsed,

            exceptions: {
              create:
                parsed.exceptions.map(
                  (
                    exception: any,
                  ) => ({
                    date:
                      new Date(
                        exception.date,
                      ),

                    status:
                      exception.status,

                    startTime:
                      nullableString(
                        exception.startTime,
                      ),

                    endTime:
                      nullableString(
                        exception.endTime,
                      ),

                    venue:
                      nullableString(
                        exception.venue,
                      ),

                    note:
                      nullableString(
                        exception.note,
                      ),
                  }),
                ),
            },
          },

          include: {
            exceptions:
              true,
          },
        });

      return res.status(201).json({
        data:
          serializeProgram(
            program,
          ),
      });
    }
    catch (error) {
      return res.status(400).json({
        error:
          error instanceof Error
            ? error.message
            : "Failed to create program",
      });
    }
  };

export const updateProgram =
  async (
    req: Request,
    res: Response,
  ) => {
    const id =
      Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        error:
          "Invalid program id",
      });
    }

    try {
      const parsed =
        parseProgramBody(
          req.body,
        );

      const program =
        await prisma.$transaction(
          async (
            transaction,
          ) => {
            await transaction
              .programException
              .deleteMany({
                where: {
                  programId:
                    id,
                },
              });

            return transaction
              .program.update({
                where: {
                  id,
                },

                data: {
                  ...parsed,

                  exceptions: {
                    create:
                      parsed.exceptions.map(
                        (
                          exception: any,
                        ) => ({
                          date:
                            new Date(
                              exception.date,
                            ),

                          status:
                            exception.status,

                          startTime:
                            nullableString(
                              exception.startTime,
                            ),

                          endTime:
                            nullableString(
                              exception.endTime,
                            ),

                          venue:
                            nullableString(
                              exception.venue,
                            ),

                          note:
                            nullableString(
                              exception.note,
                            ),
                        }),
                      ),
                  },
                },

                include: {
                  exceptions:
                    true,
                },
              });
          },
        );

      return res.status(200).json({
        data:
          serializeProgram(
            program,
          ),
      });
    }
    catch (error) {
      return res.status(400).json({
        error:
          error instanceof Error
            ? error.message
            : "Failed to update program",
      });
    }
  };

export const deleteProgram =
  async (
    req: Request,
    res: Response,
  ) => {
    const id =
      Number(req.params.id);

    if (!Number.isInteger(id)) {
      return res.status(400).json({
        error:
          "Invalid program id",
      });
    }

    try {
      await prisma.program.delete({
        where: {
          id,
        },
      });

      return res.status(204).send();
    }
    catch {
      return res.status(404).json({
        error:
          "Program not found",
      });
    }
  };
