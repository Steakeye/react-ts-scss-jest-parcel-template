import { APIFetch } from '~/app/shared/services/api-fetch/APIFetch';

const mockUserData = {};

import { getUserData } from '~/app/stores/user/UserService';

jest.mock('~/app/Config', () => ({
  Config: {
    api: {
      root: 'mock-api-root/',
      versionStable: 'mock-version-number',
    },
  },
}));

jest.mock('~/app/shared/services/api-fetch/APIFetch', () => ({
  APIFetch: jest.fn(() => mockUserData),
}));

describe('UserService - responsible for syncing with the server for user data', () => {
  afterEach(() => {
    APIFetch.mockClear();
  });

  describe('getUserData - fetches user data', () => {
    describe('when fetching with a user id', () => {
      const mockToken = 'mock-token';
      let userData: User;

      beforeAll(async () => {
        userData = await getUserData(mockToken);
      });

      // tslint:disable-next-line:ban
      xit('Fetch is called', () => {
        expect(APIFetch).toHaveBeenCalled();
        expect(APIFetch).toHaveBeenCalledTimes(1);
        expect(APIFetch).toHaveBeenCalledWith(
          'mock-api-root/u/mock-version-number/user',
          {
            headers: {
              Authorization: 'Bearer mock-token',
            },
            mode: 'cors',
          },
          { requiresAuth: false }
        );
      });

      it('user data is received', () => {
        expect(userData).toEqual(mockUserData);
      });
    });
  });
});
