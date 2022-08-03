import { getApplicationRootURL } from '~/app/shared/utils/AppDOM';
import { AuthRedirectAppState } from '~/app/stores/auth/AuthContext.d';
import { AUTH_ROUTE } from '~/app/AppRoutes';

export interface RedirectLoginOptions {
  redirect_uri: string;
  appState: AuthRedirectAppState;
}

export function redirectToAuth(
  location: Location,
  authRedirect: (options?: RedirectLoginOptions) => void
) {
  const root = getApplicationRootURL();
  const { pathname, search, hash } = location;

  const appState: AuthRedirectAppState = {
    originURL: `${pathname}${search}${hash}`,
  };

  authRedirect({
    redirect_uri: `${root}${AUTH_ROUTE}`,
    appState,
  });
}
