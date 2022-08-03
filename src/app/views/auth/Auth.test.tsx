import * as React from 'react';
// eslint-disable-next-line node/no-extraneous-import
import { RedirectProps, Redirect } from 'react-router';
import { render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {
  createRouteComponentProps,
  createMockComponent,
} from '~/app/../../jest-utils/Helpers';
import { useAuth } from '~/app/stores/auth/AuthContext';
import { AuthFCProps, AuthFC } from './Auth.d';

const mockURLParamGet = jest.fn();

global.URLSearchParams = jest.fn(x => ({
  get: mockURLParamGet,
}));

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

jest.doMock('react-router', () => ({
  Redirect: createMockComponent('Redirect', 'mock-redirect'),
}));

describe('Auth view - handles auth', () => {
  let Auth: AuthFC;
  let authInstance: RenderResult;
  let redirect: (props: RedirectProps) => Redirect;

  beforeAll(async () => {
    ({ Auth } = await import('./Auth'));
    redirect = ((await import('react-router')).Redirect as unknown) as (
      props: RedirectProps
    ) => Redirect;
  });

  describe('default behaviour', () => {
    beforeAll(() => {
      const defaultProps = createRouteComponentProps<AuthFCProps>();
      authInstance = render(<Auth {...defaultProps} />);
    });

    afterAll(() => {
      (global.URLSearchParams as jest.Mock).mockClear();
      (mockURLParamGet as jest.Mock).mockClear();
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
      expect(global.URLSearchParams).toHaveBeenCalled();
      expect(global.URLSearchParams).toHaveBeenCalledTimes(1);
      expect(global.URLSearchParams).toHaveBeenCalledWith('');
      expect(mockURLParamGet).toHaveBeenCalled();
      expect(mockURLParamGet).toHaveBeenCalledTimes(1);
      expect(mockURLParamGet).toHaveBeenCalledWith('TEMP_REDIRECT_QUERY_KEY');
    });
  });

  describe('when a redirect value is passed', () => {
    beforeAll(() => {
      const defaultProps = createRouteComponentProps<AuthFCProps>({
        location: { search: '?mockRedirectKey=/mockPath' },
      });
      (mockURLParamGet as jest.Mock).mockReturnValue('/mockPath');
      authInstance = render(<Auth {...defaultProps} />);
    });

    it('renders without error', () => {
      const el = authInstance.container;
      expect(el).toMatchSnapshot();
    });

    it('the query string is parsed', () => {
      expect(global.URLSearchParams).toHaveBeenCalled();
      expect(global.URLSearchParams).toHaveBeenCalledTimes(1);
      expect(global.URLSearchParams).toHaveBeenCalledWith(
        '?mockRedirectKey=/mockPath'
      );
      expect(mockURLParamGet).toHaveBeenCalled();
      expect(mockURLParamGet).toHaveBeenCalledTimes(1);
      expect(mockURLParamGet).toHaveBeenCalledWith('TEMP_REDIRECT_QUERY_KEY');
    });

    it('and the redirect component is used', () => {
      expect(redirect).toHaveBeenCalled();
      expect(redirect).toHaveBeenCalledTimes(1);
      expect(redirect).toHaveBeenCalledWith({ to: '/mockPath' }, {});
    });
  });

  describe('when an auth error occurs', () => {
    beforeAll(() => {
      const defaultProps = createRouteComponentProps<AuthFCProps>();

      (useAuth as jest.Mock).mockReturnValue({
        isAuthError: true,
      });
      (global.URLSearchParams as jest.Mock).mockClear();
      (mockURLParamGet as jest.Mock).mockClear();
      (redirect as jest.Mock).mockClear();

      authInstance = render(<Auth {...defaultProps} />);
    });

    it('renders without error', () => {
      const el = authInstance.container;
      expect(el).toMatchSnapshot();
    });

    it('the query string is parsed', () => {
      expect(global.URLSearchParams).toHaveBeenCalled();
      expect(global.URLSearchParams).toHaveBeenCalledTimes(1);
      expect(global.URLSearchParams).toHaveBeenCalledWith('');
      expect(mockURLParamGet).toHaveBeenCalled();
      expect(mockURLParamGet).toHaveBeenCalledTimes(1);
      expect(mockURLParamGet).toHaveBeenCalledWith('TEMP_REDIRECT_QUERY_KEY');
    });

    it('and the redirect component is used', () => {
      expect(redirect).toHaveBeenCalled();
      expect(redirect).toHaveBeenCalledTimes(1);
      expect(redirect).toHaveBeenCalledWith({ to: '/mockErrorPath' }, {});
    });
  });
});
