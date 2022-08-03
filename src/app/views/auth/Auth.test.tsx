import * as React from 'react';
// eslint-disable-next-line node/no-extraneous-import
import { Navigate, NavigateProps } from 'react-router';
import { render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {
  createRouteComponentProps,
  createMockComponent,
} from '~/app/../../jest-utils/Helpers';
import { useAuth } from '~/app/stores/auth/AuthContext';
import { AuthFCProps, AuthFC } from './Auth.d';

jest.mock('~/app/stores/auth/AuthContext', () => ({
  useAuth: jest.fn().mockReturnValue({ isAuthError: false }),
}));

jest.mock('~/app/AppRoutes', () => ({
  REDIRECT_QUERY_KEY: 'mockRedirectKey',
  ERROR_ROUTE: '/mockErrorPath',
}));

jest.mock('~/app/AppStrings', () => ({
  Views: {
    Auth: {
      MainHeading: 'mock_main_heading',
    },
  },
}));

const queryGetter = jest.fn();

jest.doMock('react-router', () => ({
  Navigate: createMockComponent('Navigate', 'mock-navigate'),
}));

jest.doMock('react-router-dom', () => ({
  useSearchParams: jest.fn(() => [{ get: queryGetter }]),
}));

describe('Auth view - handles auth', () => {
  let Auth: AuthFC;
  let authInstance: RenderResult;
  let navigate: (props: NavigateProps) => typeof Navigate;

  beforeAll(async () => {
    ({ Auth } = await import('./Auth'));
    navigate = ((await import('react-router')).Navigate as unknown) as (
      props: NavigateProps
    ) => typeof Navigate;
  });

  describe('default behaviour', () => {
    beforeAll(() => {
      const defaultProps = createRouteComponentProps<AuthFCProps>();
      authInstance = render(<Auth {...defaultProps} />);
    });

    afterAll(() => {
      (queryGetter as jest.Mock).mockClear();
    });

    it('renders without error', () => {
      const el = authInstance.container;
      expect(el).toMatchSnapshot();
    });

    it('the auth hook is used', () => {
      expect(useAuth).toHaveBeenCalled();
      expect(useAuth).toHaveBeenCalledTimes(1);
      expect(useAuth).toHaveBeenCalledWith();
    });

    it('the query string is parsed', () => {
      expect(queryGetter).toHaveBeenCalled();
      expect(queryGetter).toHaveBeenCalledTimes(1);
      expect(queryGetter).toHaveBeenCalledWith('TEMP_REDIRECT_QUERY_KEY');
    });
  });

  describe('when a navigate value is passed', () => {
    beforeAll(() => {
      (queryGetter as jest.Mock).mockReturnValue('/mockPath');
      authInstance = render(<Auth />);
    });

    it('renders without error', () => {
      const el = authInstance.container;
      expect(el).toMatchSnapshot();
    });

    it('the query string is parsed', () => {
      expect(queryGetter).toHaveBeenCalled();
      expect(queryGetter).toHaveBeenCalledTimes(1);
      expect(queryGetter).toHaveBeenCalledWith('TEMP_REDIRECT_QUERY_KEY');
    });

    it('and the navigate component is used', () => {
      expect(navigate).toHaveBeenCalled();
      expect(navigate).toHaveBeenCalledTimes(1);
      expect(navigate).toHaveBeenCalledWith(
        { replace: true, to: '/mockPath' },
        {}
      );
    });
  });

  describe('when an auth error occurs', () => {
    beforeAll(() => {
      (useAuth as jest.Mock).mockReturnValue({
        isAuthError: true,
      });
      (queryGetter as jest.Mock).mockClear();
      (navigate as jest.Mock).mockClear();

      authInstance = render(<Auth />);
    });

    it('renders without error', () => {
      const el = authInstance.container;
      expect(el).toMatchSnapshot();
    });

    it('the query string is parsed', () => {
      expect(queryGetter).toHaveBeenCalled();
      expect(queryGetter).toHaveBeenCalledTimes(1);
      expect(queryGetter).toHaveBeenCalledWith('TEMP_REDIRECT_QUERY_KEY');
    });

    it('and the navigate component is used', () => {
      expect(navigate).toHaveBeenCalled();
      expect(navigate).toHaveBeenCalledTimes(1);
      expect(navigate).toHaveBeenCalledWith(
        { replace: true, to: '/mockErrorPath' },
        {}
      );
    });
  });
});
