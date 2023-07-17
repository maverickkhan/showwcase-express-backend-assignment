import { Service } from 'typedi';
import { AxiosClient } from '@utils/axios-client';
import { RandomUser, Result } from '@/interfaces/random-user.interface';
@Service()
export class UserService {
  public async randomUser(): Promise<Result> {
    const axios = new AxiosClient('https://randomuser.me/api/');
    const { results }: RandomUser = await axios.get();
    const [user] = results;
    return user;
  }
}
