import { OptionalU } from '~/app/declarations/standard';
import { APIStructuredResponseErrorItem } from './APIFetch';

export type APIFetchErrorArgsMessage = OptionalU<string>;
/*export type APIFetchErrorArgsFileName = OptionalU<string>;
export type APIFetchErrorArgsLineNumber = OptionalU<number>;*/
export type APIFetchErrorArgsData = OptionalU<APIStructuredResponseErrorItem[]>;

export type APIFetchErrorArgs =
  | []
  | [APIFetchErrorArgsMessage]
  | [
      APIFetchErrorArgsMessage,
      /*APIFetchErrorArgsFileName,
      APIFetchErrorArgsLineNumber,*/
      APIFetchErrorArgsData
    ];
