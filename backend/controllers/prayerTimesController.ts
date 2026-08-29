import {
  Request,
  Response,
} from 'express';

const ALADHAN_BASE =
  'https://api.aladhan.com/v1';

const LATITUDE =
  -37.8136;

const LONGITUDE =
  144.9631;

/*
 * Current ISR calculation-method choice.
 * Do not change this without an explicit operational decision.
 */
const METHOD =
  3; // Muslim World League

const MELBOURNE_TIME_ZONE =
  'Australia/Melbourne';

const OMIT_TIMINGS =
  new Set([
    'Imsak',
    'Midnight',
    'Firstthird',
    'Lastthird',
  ]);

type ApiData = {
  timings:
    Record<string, string>;
  date:
    unknown;
  meta:
    unknown;
};

function normalizeTime(
  time: string,
): string {
  return time
    .split(' ')[0];
}

function filterTimings(
  data: ApiData,
): ApiData {
  const timings =
    Object.fromEntries(
      Object.entries(
        data.timings,
      )
        .filter(
          ([key]) =>
            !OMIT_TIMINGS.has(
              key,
            ),
        )
        .map(
          (
            [
              key,
              time,
            ],
          ) => [
            key,
            normalizeTime(
              time,
            ),
          ],
        ),
    );

  return {
    ...data,
    timings,
  };
}

function melbourneDateParts(
  now: Date =
    new Date(),
) {
  const parts =
    new Intl.DateTimeFormat(
      'en-AU',
      {
        timeZone:
          MELBOURNE_TIME_ZONE,

        day:
          '2-digit',

        month:
          '2-digit',

        year:
          'numeric',
      },
    ).formatToParts(
      now,
    );

  function get(
    type:
      Intl.DateTimeFormatPartTypes,
  ): string {
    return (
      parts.find(
        (
          part,
        ) =>
          part.type ===
          type,
      )?.value ??
      ''
    );
  }

  return {
    day:
      get('day'),

    month:
      get('month'),

    year:
      get('year'),
  };
}

export function todayDDMMYYYY(
  now: Date =
    new Date(),
): string {
  const {
    day,
    month,
    year,
  } =
    melbourneDateParts(
      now,
    );

  return (
    `${day}-${month}-${year}`
  );
}

function currentMelbourneYearMonth(
  now: Date =
    new Date(),
) {
  const {
    month,
    year,
  } =
    melbourneDateParts(
      now,
    );

  return {
    year:
      Number(
        year,
      ),

    month:
      Number(
        month,
      ),
  };
}

async function fetchTimings(
  date: string,
) {
  const url =
    `${ALADHAN_BASE}/timings/${date}` +
    `?latitude=${LATITUDE}` +
    `&longitude=${LONGITUDE}` +
    `&method=${METHOD}`;

  const response =
    await fetch(
      url,
    );

  if (!response.ok) {
    throw new Error(
      `AlAdhan API responded with ${response.status}`,
    );
  }

  const json =
    await response.json() as {
      data:
        ApiData;
    };

  return filterTimings(
    json.data,
  );
}

export async function getTodayPrayerTimes(
  _req: Request,
  res: Response,
) {
  try {
    const data =
      await fetchTimings(
        todayDDMMYYYY(),
      );

    res.json({
      data,
    });

    return data;
  }
  catch {
    res.status(
      502,
    ).json({
      error:
        'Failed to fetch prayer times',
    });
  }
}

export async function getPrayerTimesByDate(
  req: Request,
  res: Response,
) {
  const date =
    String(
      req.params[
        'date'
      ],
    );

  if (
    !/^\d{2}-\d{2}-\d{4}$/.test(
      date,
    )
  ) {
    res.status(
      400,
    ).json({
      error:
        'Date must be in DD-MM-YYYY format',
    });

    return;
  }

  try {
    const data =
      await fetchTimings(
        date,
      );

    res.json({
      data,
    });

    return data;
  }
  catch {
    res.status(
      502,
    ).json({
      error:
        'Failed to fetch prayer times',
    });
  }
}

export async function getMonthlyCalendar(
  req: Request,
  res: Response,
) {
  const current =
    currentMelbourneYearMonth();

  const requestedYear =
    Number(
      req.query.year,
    );

  const requestedMonth =
    Number(
      req.query.month,
    );

  const year =
    Number.isInteger(
      requestedYear,
    ) &&
    requestedYear >
      0
      ? requestedYear
      : current.year;

  const month =
    Number.isInteger(
      requestedMonth,
    ) &&
    requestedMonth >=
      1 &&
    requestedMonth <=
      12
      ? requestedMonth
      : current.month;

  try {
    const url =
      `${ALADHAN_BASE}/calendar/${year}/${month}` +
      `?latitude=${LATITUDE}` +
      `&longitude=${LONGITUDE}` +
      `&method=${METHOD}`;

    const apiResponse =
      await fetch(
        url,
      );

    if (
      !apiResponse.ok
    ) {
      throw new Error(
        `AlAdhan API responded with ${apiResponse.status}`,
      );
    }

    const json =
      await apiResponse.json() as {
        data:
          ApiData[];
      };

    res.json({
      data:
        json.data.map(
          filterTimings,
        ),
    });
  }
  catch {
    res.status(
      502,
    ).json({
      error:
        'Failed to fetch prayer calendar',
    });
  }
}