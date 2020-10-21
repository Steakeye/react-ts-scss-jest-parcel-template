import {
  FetchArgs,
  FetchCall,
  FetchPromise,
  FetchCoreArgs,
} from '~/app/shared/services/fetch/Fetch.d';
import { JSONData, OptionalU } from '~/app/declarations/standard';

export interface APIFetchOptions {
  requiresAuth?: boolean;
}

export type APIFetchArgs =
  | FetchCoreArgs
  | [RequestInfo, RequestInit, APIFetchOptions]
  | [RequestInfo, undefined, APIFetchOptions];

export type APIFetchCall<T extends JSONData<any> = JSONData<any>> = FetchCall<
  APIFetchArgs,
  T
>;
export type APIFetchPromise<T> = FetchPromise<T>;

type APIFetchHeadersComplete = 'Authorization' | 'User-Id';

export type APIFetchHeaders = Record<APIFetchHeadersComplete, string>;

export interface APIStructuredResponseMetaDefault {
  limit?: number;
  total_count?: number;
}

export interface APIStructuredResponseErrorItem {
  id?: string;
  description: string;
  field_name?: string;
}

export interface APIStructuredResponse<R = unknown, M = APIStructuredResponseMetaDefault> {
  meta: M;
  result?: R;
  errors?: APIStructuredResponseErrorItem[];
}