import { BaseReducerActionType } from '~/app/global/models';

type User = Record<string, unknown>;

export type UserContextData = User & Record<string, unknown>;

type UserReducerActionType =
  | BaseReducerActionType.Read
  | BaseReducerActionType.Update;

export interface UserReducerDispatchAction {
  type: UserReducerActionType;
  /*fetching?: boolean;
  error?: boolean;*/
  data?: Partial<UserContextData>;
}

export interface UserContextDataActions {
  updateUser(dataToUpdate: UserContextData): Promise<User>;
}

export type UserContextDataValue = UserContextData & UserContextDataActions;
