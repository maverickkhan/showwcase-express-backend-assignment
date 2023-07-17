import { PrismaClient, User } from '@prisma/client';
import { Response, NextFunction } from 'express';
import * as json from 'jsonwebtoken';
import { HttpException } from '@exceptions/httpException';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { RequestWithUser } from '@interfaces/auth.interface';
import * as middleware from '../middlewares/auth.middleware';

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    user: {
      findUnique: jest.fn(),
    },
  })),
}));

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

jest.mock('@exceptions/httpException', () => ({
  HttpException: jest.fn().mockImplementation((status, message) => ({
    status,
    message,
  })),
}));

describe('AuthMiddleware', () => {
  let req: Partial<RequestWithUser>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      header: jest.fn(),
    };
    res = {};
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should set user in request and call next if authentication is successful', async () => {
    const mockUserId = 1;
    const mockToken = 'valid-token';
    const mockUser: User | null = {
      id: mockUserId,
      email: 'john.doe@example.com',
      password: 'JohnDoe123',
    };

    jest.spyOn(middleware, 'getAuthorization').mockReturnValue(mockToken);
    jest.spyOn(json, 'verify').mockReturnValue();

    const mockFindUnique = jest.fn().mockResolvedValue(mockUser as any);
    const prismaClientMock = {
      user: {
        findUnique: mockFindUnique,
      },
    };

    (PrismaClient as jest.Mock).mockImplementation(() => prismaClientMock as unknown as PrismaClient);
    await AuthMiddleware(req as RequestWithUser, res as Response, next);

    expect(middleware.getAuthorization).toHaveBeenCalled();
    expect(json.verify).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it('should call next with HttpException if authentication token is missing', async () => {
    const mockGetAuthorization = jest.spyOn(middleware, 'getAuthorization').mockReturnValue(null);

    await AuthMiddleware(req as RequestWithUser, res as Response, next);

    expect(mockGetAuthorization).toHaveBeenCalledWith(req);
    expect(next).toHaveBeenCalledWith(new HttpException(404, 'Authentication token missing'));
  });

  it('should call next with HttpException if authentication token is invalid', async () => {
    const mockToken = 'invalid-token';
    const mockGetAuthorization = jest.spyOn(middleware, 'getAuthorization').mockReturnValue(mockToken);
    const mockVerify = jest.spyOn(json, 'verify').mockImplementation(() => {
      throw new Error('Invalid token');
    });

    await AuthMiddleware(req as RequestWithUser, res as Response, next);

    expect(mockGetAuthorization).toHaveBeenCalledWith(req);
    expect(mockVerify).toHaveBeenCalledWith(mockToken, 'secretKey');
    expect(next).toHaveBeenCalledWith(new HttpException(401, 'Wrong authentication token'));
  });

  it('should call next with HttpException if user is not found', async () => {
    const mockUserId = 1;
    const mockToken = 'valid-token';
    const mockUser: User | null = null;

    const mockGetAuthorization = jest.spyOn(middleware, 'getAuthorization').mockReturnValue(mockToken);
    const mockVerify = jest.spyOn(json, 'verify').mockReturnValue();
    const mockFindUnique = jest.fn().mockResolvedValue(mockUser as any);
    const prismaClientMock = {
      user: {
        findUnique: mockFindUnique,
      },
    };

    (PrismaClient as jest.Mock).mockImplementation(() => prismaClientMock as unknown as PrismaClient);
    await AuthMiddleware(req as RequestWithUser, res as Response, next);

    expect(mockGetAuthorization).toHaveBeenCalledWith(req);
    expect(mockVerify).toHaveBeenCalledWith(mockToken, 'secretKey');
    expect(next).toHaveBeenCalledWith(new HttpException(401, 'Wrong authentication token'));
  });
});
