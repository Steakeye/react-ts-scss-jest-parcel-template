import * as React from 'react';
import { Context, Dispatch, useContext, useEffect, useReducer } from 'react';
import { Optional, OptionalN } from '~/app/declarations/standard';
import { BaseReducerActionType } from '~/app/global/models';
import { AuthContextValue } from '../auth/AuthContext.d';
import { useAuth } from '../auth/AuthContext';
import {
  UserContextData,
  UserContextDataValue,
  UserReducerDispatchAction,
} from './UserContext.d';
import { getUserData } from './UserService';
import { TempUser as UserData } from './User.d';

//TEMP
function createUserUpdater(
  reducerDispatch: Dispatch<UserReducerDispatchAction>
): (user: UserData) => void {
  return (user: UserData) =>
    reducerDispatch({ type: BaseReducerActionType.Update, data: user });
}
function userReducer(currentState, dispatchAction) {
  //TODO - implement!
  return currentState;
}

const user: Context<Optional<UserContextDataValue>> = React.createContext<
  Optional<UserContextDataValue>
>(null);

let userData: Optional<UserContextData>;
let setUserData: Dispatch<UserReducerDispatchAction>;

function createInitialState(
  data: UserData,
  accessToken: string,
  reducerDispatch: Dispatch<UserReducerDispatchAction>
): UserContextDataValue {
  return {
    accessToken,
    ...data,
    updateUser: createUserUpdater(reducerDispatch),
  };
}

function useUserDataFetch() {
  [userData, setUserData] = useReducer(userReducer, null);
  const authData: OptionalN<AuthContextValue> = useAuth();

  useEffect(() => {
    if (authData && authData.isAuthenticated) {
      (async () => {
        const accessToken = 'TODO'; //TODO
        if (!userData || userData.accessToken !== accessToken) {
          const data = await getUserData(accessToken);
          if (!(data instanceof Error)) {
            const contextValue = createInitialState(
              data as UserData,
              accessToken,
              setUserData
            );
            setUserData({
              data: contextValue,
              type: BaseReducerActionType.Read,
            });
          }
        }
      })();
    }
  }, [authData]);

  return { userData };
}

function useUserData(): Optional<UserContextDataValue> {
  return useContext(user);
}

export { user as UserContext, useUserData, useUserDataFetch };
