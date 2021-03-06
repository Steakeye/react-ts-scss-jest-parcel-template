import * as React from 'react';
import { AuthData } from '~/app/stores/auth/AuthContext.d';
import { useAuth } from '~/app/stores/auth/AuthContext';
import { useUserData } from '~/app/stores/user/UserContext';
import { AnyView, ExtendedRouteProps } from './AppRoutes.d';
import { redirectToAuth } from '~/app/shared/utils/Auth';
import { OptionalN } from '~/app/declarations/standard';

export function AuthenticatedRoute({ component, ...rest }: ExtendedRouteProps) {
  const View: AnyView = component as AnyView;
  const {
    isReady,
    isAuthenticated,
    loginWithRedirect,
    loading,
  } = (rest.requiresAuth ? useAuth() : {}) as AuthData;
  const user = useUserData();
  let view: OptionalN<JSX.Element>;

  if (isReady && !isAuthenticated && !loading) {
    const { location } = rest;
    redirectToAuth(location, loginWithRedirect);
    view = null;
  } else if (isAuthenticated && user) {
    view = <View {...rest} />;
  } else {
    view = null;
  }

  return view;
}
