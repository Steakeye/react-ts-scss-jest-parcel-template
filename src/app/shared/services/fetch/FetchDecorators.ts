import { JSONData, Optional } from '~/app/declarations/standard';
import { FetchCall, FetchResponse, FetchCoreArgs } from './Fetch';
import {
  isStatusFail,
  getContentTypeFromHeaders,
  isJsonContentType,
} from './FetchUtils';

export function checkForErrors(fetchCall: FetchCall): FetchCall {
  return (...args: FetchCoreArgs) => {
    return fetchCall(...args).then(
      (response: FetchResponse<unknown>) => {
        if (!(response as Response).ok) {
          throw new Error(
            `${(response as Response).status}, ${
              (response as Response).statusText
            }`
          );
        }

        return response;
      },
      (error: Error) => {
        return error;
      }
    );
  };
}

export function checkForStatus(fetchCall: FetchCall): FetchCall {
  return (...args: FetchCoreArgs) => {
    return fetchCall(...args).then(
      (response: FetchResponse<unknown>) => {
        const { status } = response as Response;
        let retValue: Optional<Promise<Response>>;

        if (isStatusFail(status)) {
          retValue = Promise.reject({
            status: (response as Response).status,
            statusText: (response as Response).statusText,
          });
        }

        return (retValue as Promise<Response>) || response;
      },
      (error: Error) => {
        return error;
      }
    );
  };
}

export function resolveDataByContentType(fetchCall: FetchCall): FetchCall {
  return (...args: FetchCoreArgs) => {
    return fetchCall(...args).then(
      (response: FetchResponse<unknown>) => {
        const [, requestOptions] = args;
        const { headers = {} } = requestOptions as RequestInit;
        const contentType = getContentTypeFromHeaders(headers);

        let retValue: FetchResponse<unknown> | Promise<JSONData<unknown>>;

        if (isJsonContentType(contentType)) {
          if (response && response instanceof Error) {
            return response;
          } else {
            retValue = (response as Response).json();
          }
        } else {
          retValue = response;
        }

        return retValue;
      },
      (error: Error) => {
        return error;
      }
    );
  };
}
