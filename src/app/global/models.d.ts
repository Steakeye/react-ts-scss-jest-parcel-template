import { Optional, OptionalN } from '~/app/declarations/standard';

export interface BaseReducerDispatchAction<
  Data,
  Type,
  SubType = undefined,
  Meta = undefined
> {
  type: Type;
  subType?: SubType;
  data?: Data;
  meta?: Meta;
}

export type ImmutableDataReducerActionTypes =
  | 'fetching'
  | 'error'
  | 'data'
  | 'reset';
export type MutableDataReducerActionTypes =
  | ImmutableDataReducerActionTypes
  | 'update';

export interface FetchServiceHookResultData<D> {
  result: D;
}

export interface FetchServiceHookStates {
  isFetching: boolean;
  hasFetched: boolean;
  noResults: boolean;
}

export interface FetchPaginatedServiceHookStates
  extends FetchServiceHookStates {
  noMoreResults: boolean;
  page: OptionalN<number>;
}

export type FetchServiceHookReducerDispatchAction<
  Data,
  Type extends ImmutableDataReducerActionTypes = ImmutableDataReducerActionTypes
> = BaseReducerDispatchAction<Data, Type>;
