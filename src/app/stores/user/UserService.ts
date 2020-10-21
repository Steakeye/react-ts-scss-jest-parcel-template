//import { Config } from '~/app/Config';
import { TempUser } from './User.d';

/*const {
  api: { root: apiRoot, },
} = Config;*/

async function getUserData(accessToken: string): Promise<TempUser | Error> {
  //TODO
  return {} as TempUser;
}

async function putUserData(userData: TempUser): Promise<TempUser | Error> {
  //TODO
  const result = {
    ...userData,
  };

  return result;
}

export { getUserData, putUserData };
