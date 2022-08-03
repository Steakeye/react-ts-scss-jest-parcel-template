import { OptionalU } from '~/app/declarations/standard';

export type FetchCoreArgs = [RequestInfo] | [RequestInfo, RequestInit];
export type FetchArgs =
  | FetchCoreArgs
  | [RequestInfo, undefined, ...unknown[]]
  | [RequestInfo, RequestInit, ...unknown[]];
export type FetchResponse<R = Response> = R;
export type FetchPromise<R> = Promise<FetchResponse<R | Error>>;
export type FetchCall<A extends FetchArgs = FetchCoreArgs, R = unknown> = (
  ...fetchArgs: A
) => FetchPromise<R>;
