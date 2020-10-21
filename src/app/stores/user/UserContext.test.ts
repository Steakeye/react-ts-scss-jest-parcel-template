import React from 'react';
import { OptionalN } from '~/app/declarations/standard';
import { UserContextData } from './UserContext.d';

const mockUseAuth = jest.fn(() => 'mock-auth-data');

jest.doMock('../auth/AuthContext', () => ({
  useAuth: mockUseAuth,
}));

const mockCreateContext = jest
  .spyOn(React, 'createContext')
  .mockImplementation(jest.fn());
const mockReducerDispatch = jest.fn();
const mockUseReducer = jest
  .spyOn(React, 'useReducer')
  .mockImplementation((fn: () => void, state: unknown) => [
    state,
    mockReducerDispatch,
  ]);
const mockUseEffect = jest
  .spyOn(React, 'useEffect')
  .mockImplementation(jest.fn());

describe('UserContext module', () => {
  describe('UserContext', () => {
    let useUserDataFetch: () => OptionalN<UserContextData>;

    beforeAll(async () => {
      mockCreateContext.mockClear();
      ({ useUserDataFetch } = await import('./UserContext'));
    });

    it('calls createContext', () => {
      expect(mockCreateContext).toHaveBeenCalled();
      //expect(React.createContext).toHaveBeenCalledTimes(1);
      expect(mockCreateContext).toHaveBeenCalledWith(null);
    });

    describe('useUserDataFetch', () => {
      //let hookResult: RenderHookResult<undefined, UserContextData>;
      let result;

      beforeAll(() => {
        result = useUserDataFetch();
      });

      it('reducer is initialised', () => {
        expect(mockUseReducer).toHaveBeenCalledTimes(1);
        expect(mockUseReducer).toHaveBeenCalledWith(
          expect.toBeFunction(),
          null
        );
      });

      it('auth hook is initialised', () => {
        expect(mockUseAuth).toHaveBeenCalledTimes(1);
        expect(mockUseAuth).toHaveBeenCalledWith();
      });

      it('effect listener is initialised', () => {
        expect(mockUseEffect).toHaveBeenCalledTimes(1);
        expect(mockUseEffect).toHaveBeenCalledWith(expect.toBeFunction(), [
          'mock-auth-data',
        ]);
      });

      it('returns a user data', () => {
        expect(result).toEqual({ userData: null });
      });
    });
  });
});
