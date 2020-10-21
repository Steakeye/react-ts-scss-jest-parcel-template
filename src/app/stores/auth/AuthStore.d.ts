import * as React from 'react';
import { RouteComponentProps } from "react-router";
import { ImmutableDataReducerActionTypes } from "~/app/global/models.d";
import { AuthData, AuthInternalData, AuthRedirectAppState } from "~/app/stores/auth/AuthContext.d";

//Temp
interface TempAuthClientOptions {}

type AuthReducerDispatchActionType = ImmutableDataReducerActionTypes | 'ready';

interface AuthReducerDispatchAction extends Partial<AuthInternalData> {
  type: AuthReducerDispatchActionType;
}

interface AuthProviderProps extends Partial<TempAuthClientOptions> {
  children: React.ReactNode;
  onRedirectCallback?: DefaultRedirectCallback;
}

type AuthStoreProps = React.PropsWithChildren<AuthProviderProps>

type AuthStoreFC = (
  props: AuthStoreProps & RouteComponentProps
) => JSX.Element;

type DefaultRedirectCallback = (result: AuthRedirectAppState) => void;
