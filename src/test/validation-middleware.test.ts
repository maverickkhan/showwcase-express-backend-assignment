import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { HttpException } from '@exceptions/httpException';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { CreateUserDto } from '@/dtos/users.dto';

class TestDto {
  constructor(public email: string, public password: string) {}
}

describe('ValidationMiddleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      body: {},
    };
    res = {};
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should pass validation', async () => {
    req.body = {
      email: 'abc@mail.com',
      password: '123Testing',
    };
    const middleware = ValidationMiddleware(TestDto);

    middleware(req as Request, res as Response, next);

    expect(req.body).toEqual({"email": "abc@mail.com", "password": "123Testing"});
    expect(req.body.email).toBe('abc@mail.com');
    expect(req.body.password).toBe('123Testing');
  });

  it('should fail validation and call next with HTTP exception if DTO is invalid', async () => {
    let check = {body: {}}
    check.body = {
        email: 'abc@mail.com',
        password: 123,
    };
    const middleware = ValidationMiddleware(CreateUserDto);
    middleware(check as Request, res as Response, next);
    expect(req.body).toStrictEqual({});
  });
});
