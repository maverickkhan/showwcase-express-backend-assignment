import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { AuthService } from '@services/auth.service';

export class AuthController {
  public auth = Container.get(AuthService);

  public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.body;
      const signUpUserData: User = await this.auth.signup(userData);

      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.body;
      const data = await this.auth.login(userData);
      res.status(200).json({ data, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public getUser = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<any> => {
    try {
      const userData: User = req.user;
      res.status(200).json({ data: { user: req.user }, message: 'get profile' });
    } catch (error) {
      next(error);
    }
  };
}
