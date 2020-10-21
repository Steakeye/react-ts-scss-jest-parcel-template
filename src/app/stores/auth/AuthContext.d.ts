import React from 'react';
import '@auth/auth-spa-js';
import { OptionalN } from '~/app/declarations/standard';

interface AuthData {
  isReady: boolean;
  isAuthenticated: boolean;
  isAuthError: boolean;
  user: unknown;
  loading: boolean;
}

export interface AuthRedirectAppState<S = unknown> {
  originURL: string;
  state?: S;
}

interface AuthInternalData extends AuthData {
  appState?: AuthRedirectAppState;
}

interface AuthContextValue extends AuthData {
  //TODO
}

type AuthContext = React.Context<OptionalN<AuthContextValue>>;

type AuthHook = () => OptionalN<AuthContextValue>;
