import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import request from 'supertest';
import {App} from '@/app';
import { CreateUserDto } from '@dtos/users.dto';
import {AuthRoute} from '@routes/auth.route';
import { NextFunction, Request, Response } from 'express';

import { AuthController } from '@/controllers/auth.controller';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Auth', () => {
  describe('[POST] /signup', () => {
    it('response should have the Create userData', async () => {
      const userData: CreateUserDto = {
        email: 'test@email.com',
        password: 'q1w2e3r41',
      };

      const authRoute = new AuthRoute();
      const users = authRoute.auth.auth.users;

      users.findUnique = jest.fn().mockReturnValue(null);
      users.create = jest.fn().mockReturnValue({
        id: 1,
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
      });

      const app = new App([authRoute]);
      return request(app.getServer())
      .post(`/api${authRoute.path}signup`)
      .send(userData)
      .expect(201)
      .expect((res) => {
        expect(res.body.message).toEqual('signup')
        expect(res.body.data).toHaveProperty('id')
      });
    });
  });

  describe('[POST] /login', () => {
    it('response should have the Set-Cookie header with the Authorization token', async () => {
      const userData: CreateUserDto = {
        email: 'test@email.com',
        password: 'q1w2e3r41',
      };

      const authRoute = new AuthRoute();
      const users = authRoute.auth.auth.users;

      users.findUnique = jest.fn().mockReturnValue({
        id: 1,
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
      });

      const app = new App([authRoute]);
      return request(app.getServer())
        .post(`/api${authRoute.path}login`)
        .send(userData)
        .expect(200)
        .expect((res) => {
          expect(res.body.message).toEqual('login')
          expect(res.body.data).toHaveProperty('token')
        });
    });
  });

  describe('GET /auth/profile', () => {
    type RequestWithUser = Request & { user: User };
    let req: Partial<RequestWithUser>;
    let res: Partial<Response>;
    let next: NextFunction;
    let authController: AuthController;
  
    beforeEach(() => {
      req = {};
      res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      next = jest.fn();
      authController = new AuthController();
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should call getUser method and return user profile', async () => {
      const mockUser = { id: 1, email: 'john.doe@example.com', password: 'JohnDoe123' };
      req.user = mockUser;

      expect(authController.getUser(req as RequestWithUser, res as Response, next)).resolves.not.toThrow();
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
}); 