import request from 'supertest';
import { UserRoute } from '../routes/users.route';
import { App } from '@/app';

describe('UserRoute', () => {

  describe('GET /users/random', () => {
    it('should call UserController.random and return status 200 with random user data', async () => {

      const userRoute = new UserRoute();
      const app = new App([userRoute]);
      return await request(app.getServer())
      .get('/api/users/random')
      .expect(200)
      .expect((res) => {
        expect(res.body).toBeDefined()
        expect(res.body).toBeInstanceOf(Object)
      });
    });
  });
});
