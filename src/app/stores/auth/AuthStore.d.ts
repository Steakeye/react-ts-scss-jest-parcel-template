import * as React from 'react';
import { PathRouteProps } from 'react-router';
import { ImmutableDataReducerActionTypes } from '~/app/global/models.d';
import {
  AuthInternalData,
  AuthRedirectAppState,
} from '~/app/stores/auth/AuthContext.d';

//Temp
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TempAuthClientOptions {}

type AuthReducerDispatchActionType = ImmutableDataReducerActionTypes | 'ready';

interface AuthReducerDispatchAction extends Partial<AuthInternalData> {
  type: AuthReducerDispatchActionType;
}

interface AuthProviderProps extends Partial<TempAuthClientOptions> {
  children: React.ReactNode;
  onRedirectCallback?: DefaultRedirectCallback;
}

type AuthStoreProps = React.PropsWithChildren<AuthProviderProps>;

type AuthStoreFC = (props: AuthStoreProps & PathRouteProps) => JSX.Element;

type DefaultRedirectCallback = (result: AuthRedirectAppState) => void;
