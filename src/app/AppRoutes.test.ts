import { ExtendedRouteProps } from '~/app/AppRoutes.d';

jest.mock('./views/home/Home', () => ({
  Home: 'MockHomeView',
}));

jest.mock('./views/auth/Auth', () => ({
  Auth: 'MockAuthView',
}));

jest.mock('./views/server-error/ServerError', () => ({
  ServerError: 'MockServerErrorView',
}));

jest.mock('./views/not-found/NotFound', () => ({
  NotFound: 'MockNotFoundView',
}));

let AppRoutes: ExtendedRouteProps[];

beforeAll(async () => {
  ({ AppRoutes } = await import('./AppRoutes'));
});

describe('Application Routes - route configuration and route related helper functions', () => {
  describe('Application Route configuration', () => {
    it('App routes are configured in a list of routes', () => {
      expect(AppRoutes).toMatchSnapshot();
    });
  });
});
