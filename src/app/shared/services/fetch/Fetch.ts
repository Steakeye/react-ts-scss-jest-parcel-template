import { FetchCall } from './Fetch';
import {
  checkForErrors,
  checkForStatus,
  resolveDataByContentType,
} from './FetchDecorators';

function baseFetch(url: RequestInfo, options?: RequestInit): Promise<Response> {
  return fetch(url, options);
}

let decoratedFetch: FetchCall = baseFetch;

decoratedFetch = checkForErrors(decoratedFetch);
decoratedFetch = checkForStatus(decoratedFetch);
decoratedFetch = resolveDataByContentType(decoratedFetch);

export { decoratedFetch as Fetch };
