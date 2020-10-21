import { APIFetchError } from './APIFetchError';
import { APIStructuredResponseErrorItem } from './APIFetch';

describe('APIFetchError - custom Error type for failed API requests', () => {
  const mockErrorMessage = 'mock-error-message';
  const mockErrors = [
    {
      id: 'mock-error-one',
      description: 'mock-error-one-description',
      field_name: 'mock-error-one-field-name',
    },
    {
      id: 'mock-error-two',
      description: 'mock-error-two-description',
      field_name: 'mock-error-two-field-name',
    },
  ] as APIStructuredResponseErrorItem[];
  let error: APIFetchError;

  describe('when instantiating an APIFetchError', () => {
    beforeEach(() => {
      error = new APIFetchError(mockErrorMessage, mockErrors);
    });

    it('an error instance is created', () => {
      expect(error).toBeInstanceOf(APIFetchError);
      expect(error).toBeInstanceOf(Error);
      expect(error.name).toEqual('APIFetchError');
    });

    it('the message is accessible', () => {
      expect(error.message).toEqual('mock-error-message');
    });

    it('the error data is accessible', () => {
      expect(error.data).toEqual(mockErrors);
    });
  });
});
