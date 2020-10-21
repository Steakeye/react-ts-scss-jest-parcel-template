import { v4 } from 'uuid';

import { Optional } from '~/app/declarations/standard';
import {
  APIFetchArgs,
  APIFetchCall,
  APIFetchOptions,
  APIStructuredResponse,
} from './APIFetch.d';
import { FetchResponse } from '~/app/shared/services/fetch/Fetch.d';
import { AuthHeaderName, RequestIDHeaderName } from './APIFetchDecorators.d';
import { APIFetchError } from '~/app/shared/services/api-fetch/APIFetchError';

const requestIDHeaderName = 'X-Request-ID';
const authHeaderName = 'Authorization';

export function addRequestID(fetchCall: APIFetchCall): APIFetchCall {
  return (...args: APIFetchArgs) => {
    let [, fetchOptions] = args;
    let headers: Optional<HeadersInit>;

    if (!fetchOptions) {
      fetchOptions = {};
      args[1] = fetchOptions;
    }

    ({ headers } = fetchOptions);

    if (!headers) {
      headers = {};
      fetchOptions.headers = headers;
    }

    if (
      (headers as Record<RequestIDHeaderName, string>)[requestIDHeaderName] ===
      undefined
    ) {
      (headers as Record<RequestIDHeaderName, string>)[
        requestIDHeaderName
      ] = v4();
    }

    return fetchCall(...args);
  };
}

const DEFAULT_API_OPTIONS: APIFetchOptions = {
  requiresAuth: true,
};

function safelyGetHeaders(fetchArgs: APIFetchArgs): HeadersInit {
  let [, fetchOptions] = fetchArgs;

  let headers: Optional<HeadersInit>;
  if (!fetchOptions) {
    fetchOptions = {};
    fetchArgs[1] = fetchOptions;
  }

  ({ headers } = fetchOptions);

  if (!headers) {
    headers = {};
    fetchOptions.headers = headers;
  }

  return headers;
}

function resolveAPIOptions(fetchArgs: APIFetchArgs): APIFetchOptions {
  let [, , apiOptions = DEFAULT_API_OPTIONS] = fetchArgs;

  if (apiOptions !== DEFAULT_API_OPTIONS) {
    apiOptions = { ...DEFAULT_API_OPTIONS, ...apiOptions };
  }

  return apiOptions;
}

export function addAuthHeaders(fetchCall: APIFetchCall): APIFetchCall {
  return async (...args: APIFetchArgs) => {
    const apiOptions = resolveAPIOptions(args);

    const { requiresAuth } = apiOptions;

    if (requiresAuth) {
      const headers = safelyGetHeaders(args);

      //Only try to get a a Auth token value if the header doesn't already have one but needs one
      if (
        (headers as Record<AuthHeaderName, string>)[authHeaderName] ===
        undefined
      ) {
        //TODO
        (headers as Record<AuthHeaderName, string>)[authHeaderName] = `TODO`;
      }
    }

    return fetchCall(...args);
  };
}

const defaultHeaders: HeadersInit = {
  'Content-Type': 'application/json',
};

const defaultFetchOptions: Partial<RequestInit> = {
  cache: 'no-cache',
};

export function addDefaultFetchOptions(fetchCall: APIFetchCall): APIFetchCall {
  return (...args: APIFetchArgs) => {
    let [, fetchOptions = {}] = args;

    const headers = { ...defaultHeaders, ...fetchOptions.headers };

    fetchOptions = { ...defaultFetchOptions, ...fetchOptions, headers };
    args[1] = fetchOptions;

    return fetchCall(...args);
  };
}

export function checkForErrors(fetchCall: APIFetchCall): APIFetchCall {
  return (...args: APIFetchArgs) => {
    return fetchCall(...args).then(
      (response: FetchResponse<unknown | APIStructuredResponse>) => {
        const { errors } = (response as APIStructuredResponse) || {};

        if (errors) {
          const [url] = args;
          throw new APIFetchError(url as string, errors);
        }

        return response;
      },
      (error: Error) => {
        return error;
      }
    );
  };
}
