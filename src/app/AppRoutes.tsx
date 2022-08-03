import { ExtendedRouteProps } from './AppRoutes.d';
import { Home } from './views/home/Home';
import { Auth } from './views/auth/Auth';
import { NotFound } from '~/app/views/not-found/NotFound';
import { ServerError } from '~/app/views/server-error/ServerError';

export const BASE_ROUTE = '/';
export const AUTH_ROUTE = '/auth';
export const ERROR_ROUTE = '/error';

const appRoutes: ExtendedRouteProps[] = [
  {
    path: BASE_ROUTE,
    component: Home,
    name: 'Home View',
  },
  {
    path: AUTH_ROUTE,
    component: Auth,
    name: 'Auth View',
  },
  {
    path: ERROR_ROUTE,
    component: ServerError,
    name: 'Server Error View',
  },
  {
    path: '/*',
    component: NotFound,
    name: 'Not Found View',
  },
];

export { appRoutes as AppRoutes };
