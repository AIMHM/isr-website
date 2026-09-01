import {
  afterEach,
  expect,
  jest,
  test,
} from '@jest/globals';
import {
  Request,
  Response,
} from 'express';

const mockQueryRaw = jest.fn<() => Promise<unknown>>();

jest.mock('../lib/prisma', () => ({
  prisma: {
    $queryRaw: mockQueryRaw,
  },
}));

import {
  getReadiness,
} from '../controllers/healthController';

afterEach(() => {
  jest.clearAllMocks();
});

function mockRes() {
  const json = jest.fn();
  const status = jest.fn((_code: number) => ({ json }));
  const set = jest.fn();

  const res = {
    json,
    status,
    set,
  } as unknown as Response;

  return {
    res,
    json,
    status,
    set,
  };
}

test('readiness returns 200 when the database responds', async () => {
  mockQueryRaw.mockResolvedValue([{ '?column?': 1 }]);

  const req = {} as Request;
  const {
    res,
    json,
    status,
    set,
  } = mockRes();

  await getReadiness(req, res);

  expect(set).toHaveBeenCalledWith(
    'Cache-Control',
    'no-store',
  );
  expect(status).toHaveBeenCalledWith(200);
  expect(json).toHaveBeenCalledWith({
    status: 'ready',
  });
});

test('readiness returns 503 without exposing database errors', async () => {
  mockQueryRaw.mockRejectedValue(
    new Error(
      'sensitive database connection detail',
    ),
  );

  const req = {} as Request;
  const {
    res,
    json,
    status,
  } = mockRes();

  await getReadiness(req, res);

  expect(status).toHaveBeenCalledWith(503);
  expect(json).toHaveBeenCalledWith({
    status: 'unavailable',
  });
  expect(json).not.toHaveBeenCalledWith(
    expect.objectContaining({
      error: expect.anything(),
    }),
  );
});
