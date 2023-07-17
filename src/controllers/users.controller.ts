import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { UserService } from '@services/users.service';
import { Result } from '@/interfaces/random-user.interface';

export class UserController {
  public user = Container.get(UserService);

  public random = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const randomUserData: Result = await this.user.randomUser();

      res.status(200).json({ data: randomUserData, message: 'randomUser' });
    } catch (error) {
      next(error);
    }
  };
}
