import { APIFetchErrorArgs } from './APIFetchError';
import { OptionalU } from '~/app/declarations/standard';
import { APIStructuredResponseErrorItem } from './APIFetch';

export class APIFetchError extends Error {
  constructor(...args: APIFetchErrorArgs) {
    const [message, apiFetchErrorData] = args;
    super(message);

    this.name = 'APIFetchError';

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, APIFetchError);
    }

    // Custom debugging information
    this.data = apiFetchErrorData;
  }

  data: OptionalU<APIStructuredResponseErrorItem[]>;
}
