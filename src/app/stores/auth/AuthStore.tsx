import React, { useEffect, useReducer } from 'react';
//import { Config } from '~/app/Config';
import { AuthContext } from './AuthContext';
import {
  AuthReducerDispatchAction,
  AuthStoreProps,
  AuthStoreFC,
} from './AuthStore.d';
import { AuthInternalData } from './AuthContext.d';
import { RouteComponentProps, withRouter } from 'react-router';

//Temp
//interface TempAuthClient {}

//const { auth: authConfig } = Config;

function createInitialState(): AuthInternalData {
  return {
    isReady: false,
    isAuthenticated: false,
    isAuthError: false,
    user: undefined,
    loading: true,
    popupOpen: false,
  };
}

function authReducer(
  state: AuthInternalData,
  action: AuthReducerDispatchAction
): AuthInternalData {
  let updatedState: AuthInternalData;

  //TODO: Reducer - implementation
  updatedState = state;

  return updatedState;
}

export const AuthStore = ({
  children,
  history,
  ...initOptions
}: AuthStoreProps & RouteComponentProps) => {
  //const [authClient, setAuthClient] = useState<TempAuthClient>(); //TODO
  const [data /*setData*/] = useReducer(authReducer, createInitialState());

  useEffect(() => {
    (async () => {
      //TODO: Setup - implementation
    })();
  }, []);

  useEffect(() => {
    //TODO: Update - implementation
  }, [data]);

  const { isReady, isAuthenticated, isAuthError, user, loading } = data;

  return (
    <AuthContext.Provider
      value={{
        isReady,
        isAuthenticated,
        isAuthError,
        user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const authStoreWithRouter = withRouter<
  AuthStoreProps & RouteComponentProps,
  AuthStoreFC
>(AuthStore);

export { authStoreWithRouter as AuthStoreWithRouter };
