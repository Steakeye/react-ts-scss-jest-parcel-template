import { BaseReducerActionType } from '~/app/global/models';

export type UserContextData = User & {};

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
