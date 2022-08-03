import React from 'react';
import '@auth/auth-spa-js';
import { OptionalN } from '~/app/declarations/standard';
import { RedirectLoginOptions } from '~/app/shared/utils/Auth';

interface AuthData {
  isReady: boolean;
  isAuthenticated: boolean;
  isAuthError: boolean;
  user: unknown;
  loading: boolean;
  loginWithRedirect?: (options?: RedirectLoginOptions) => void;
}

export interface AuthRedirectAppState<S = unknown> {
  originURL: string;
  state?: S;
}

interface AuthInternalData extends AuthData {
  appState?: AuthRedirectAppState;
}

type AuthContextValue = AuthData;

type AuthContext = React.Context<OptionalN<AuthContextValue>>;

type AuthHook = () => OptionalN<AuthContextValue>;
