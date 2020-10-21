import * as React from 'react';
import { render, RenderResult, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createMockComponent } from '~/../jest-utils/Helpers';
import { UserStoreFC } from './UserStore.d';

const mockUser = 'mock-user';
const useUserDataFetch = jest.fn(() => ({ userData: mockUser }));

jest.doMock('./UserContext', () => ({
  UserContext: {
    Provider: createMockComponent(
      'UserStoreProvider',
      'mock-user-store-provider'
    ),
  },
  useUserDataFetch,
}));

describe('UserStore module - exposes persistent user data', () => {
  describe('UserStore component - composes the user data provider and children components', () => {
    let UserStore: UserStoreFC;
    let storesInstance: RenderResult;

    describe('expected behaviour is', () => {
      beforeAll(async () => {
        ({ UserStore } = await import('./UserStore'));
      });

      beforeEach(() => {
        act(() => {
          storesInstance = render(<UserStore>{'store children'}</UserStore>);
        });
      });

      afterEach(() => {
        if (storesInstance) {
          const { unmount } = storesInstance;
          unmount();
        }
      });

      it('user data is fetched', () => {
        expect(useUserDataFetch).toHaveBeenCalled();
      });

      it('composes the store and children', () => {
        expect(storesInstance.container).toMatchSnapshot();
        expect(storesInstance.container).toHaveTextContent('store children');
      });

      // tslint:disable-next-line:ban
      it('has data from an initial API call', () => {
        const mockStoreProvider = storesInstance.getByTestId(
          'mock-user-store-provider'
        );
        expect(mockStoreProvider).toHaveAttribute('value', mockUser);
      });
    });
  });
});
