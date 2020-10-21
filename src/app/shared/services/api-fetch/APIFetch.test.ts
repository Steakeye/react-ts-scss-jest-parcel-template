import {
  addDefaultFetchOptions,
  addRequestID,
  addAuthHeaders,
  checkForErrors,
} from './APIFetchDecorators';
import { FetchCall } from '../fetch/Fetch';
import { Fetch } from '../fetch/Fetch';

jest.mock('../fetch/Fetch', () => ({
  Fetch: jest.fn().mockResolvedValue('mock-fetch-response'),
}));

jest.mock('./APIFetchDecorators', () => ({
  addAuthHeaders: jest.fn(func => func),
  addRequestID: jest.fn(func => func),
  addDefaultFetchOptions: jest.fn(func => func),
  checkForErrors: jest.fn(func => func),
}));

describe('APIFetch - wrapper around the Fetch service function, adding custom functionality', () => {
  //TODO add test for decorator addUserId
  const decorator = addAuthHeaders;
  // tslint:disable-next-line:no-unused-expression
  decorator;

  let APIFetch: FetchCall;

  beforeAll(async () => {
    ({ APIFetch } = await import('./APIFetch'));
  });

  describe('functional composition', () => {
    it('includes a function to include default fetch options', () => {
      expect(checkForErrors).toHaveBeenCalled();
      expect(checkForErrors).toHaveBeenCalledWith(Fetch);
    });

    it('includes a function to include default fetch options', () => {
      expect(addDefaultFetchOptions).toHaveBeenCalled();
      expect(addDefaultFetchOptions).toHaveBeenCalledWith(Fetch);
    });

    it('includes a function to add  unique request ID', () => {
      expect(addRequestID).toHaveBeenCalled();
      expect(addRequestID).toHaveBeenCalledWith(Fetch);
    });

    it('the functions are included in a particular order', () => {
      expect(checkForErrors).toHaveBeenCalledBefore(
        addDefaultFetchOptions as jest.Mock
      );
      expect(addDefaultFetchOptions).toHaveBeenCalledBefore(
        addRequestID as jest.Mock
      );
      expect(addRequestID).toHaveBeenCalledAfter(
        addDefaultFetchOptions as jest.Mock
      );
      expect(addAuthHeaders).toHaveBeenCalledAfter(addRequestID);
    });
  });

  describe('default behaviour', () => {
    const mockUrl = 'mock-url';
    const mockOptions = {};
    const mockResponse = 'mock-fetch-response';
    let fetchResult: Promise<Response>;

    beforeAll(() => {
      fetchResult = APIFetch(mockUrl, mockOptions) as Promise<Response>;
    });

    it('the APIFetch function calls the Fetch service function', () => {
      expect(Fetch).toHaveBeenCalled();
      expect(Fetch).toHaveBeenCalledTimes(1);
      expect(Fetch).toHaveBeenCalledWith(mockUrl, mockOptions);
    });

    it('the Fetch function return the Fetch service function Promise', async () => {
      expect(Fetch).toHaveReturned();
      expect(Fetch).toHaveReturnedWith(fetchResult);
      expect(fetchResult).toResolve();
      await expect(fetchResult).resolves.toBe(mockResponse);
    });
  });
});
