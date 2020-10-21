import React, { useContext } from 'react';
import {
  AuthContextValue,
  AuthHook,
  AuthContext,
} from '~/app/stores/auth/AuthContext.d';
import { OptionalN } from '~/app/declarations/standard';

export const authContext: AuthContext = React.createContext<
  OptionalN<AuthContextValue>
>(null);

export const useAuth: AuthHook = () =>
  useContext<OptionalN<AuthContextValue>>(authContext);

export { authContext as AuthContext };
