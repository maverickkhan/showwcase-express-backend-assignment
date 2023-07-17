import { Request, Response, NextFunction } from 'express';
import { ErrorMiddleware } from '@middlewares/error.middleware';
import { logger } from '@utils/logger';
import { HttpException } from '@/exceptions/httpException';

jest.mock('@utils/logger');

describe('ErrorMiddleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      method: 'GET',
      path: '/test',
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle HTTP exception and log error', () => {
    const error = new HttpException(404, 'Not Found');

    ErrorMiddleware(error, req as Request, res as Response, next);

    expect(logger.error).toHaveBeenCalledWith(
        expect.stringMatching(/\[GET\] \/test >> StatusCode:: 404, Message:: Not Found at/),
    );
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Not Found' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should handle error with status and message', () => {
    const error = new HttpException(500, 'Something went wrong');

    ErrorMiddleware(error, req as Request, res as Response, next);

    expect(logger.error).toHaveBeenCalledWith(
        expect.stringMatching(/\[GET\] \/test >> StatusCode:: 500, Message:: Something went wrong at/),
    );
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Something went wrong' });
    expect(next).not.toHaveBeenCalled();
  });
});
