import { Fetch } from '../fetch/Fetch';
import {
  addDefaultFetchOptions,
  addRequestID,
  addAuthHeaders,
  checkForErrors,
} from './APIFetchDecorators';
import { APIFetchArgs, APIFetchCall, APIFetchPromise } from './APIFetch.d';

export enum APIFetchResponseMessage {
  OK = 'ok',
}

let apiFetch = Fetch as APIFetchCall;

apiFetch = checkForErrors(apiFetch);
apiFetch = addDefaultFetchOptions(apiFetch);
apiFetch = addRequestID(apiFetch);
apiFetch = addAuthHeaders(apiFetch);

function APIFetch<D>(...args: APIFetchArgs): APIFetchPromise<D> {
  return (apiFetch as APIFetchCall<D>)(...args);
}

export { APIFetch };
