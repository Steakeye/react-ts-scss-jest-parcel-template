import { FetchMock } from 'jest-fetch-mock';
import { getMockCallValue } from '~/../jest-utils/Helpers';
import {
  checkForErrors,
  checkForStatus,
  resolveDataByContentType,
} from './FetchDecorators';
import { FetchCall } from './Fetch';

jest.mock('./FetchDecorators', () => ({
  checkForErrors: jest.fn(func => func),
  checkForStatus: jest.fn(func => func),
  resolveDataByContentType: jest.fn(func => func),
}));

describe('Fetch - wrapper around the native fetch function, adding custom functionality', () => {
  let Fetch: FetchCall;

  //TODO add test for decorator resolveDataByContentType
  const decorator = resolveDataByContentType;
  // tslint:disable-next-line:no-unused-expression
  decorator;

  beforeAll(async () => {
    ({ Fetch } = await import('./Fetch'));
  });

  describe('functional composition', () => {
    it('includes a function to check for basic errors', () => {
      expect(checkForErrors).toHaveBeenCalled();
      expect(checkForErrors).toHaveBeenCalledWith(expect.any(Function));
      const [funcArg] = getMockCallValue<FetchCall>(
        checkForErrors as jest.Mock
      );
      expect(funcArg.name).toBe('baseFetch');
    });

    it('includes a function to check for status errors', () => {
      expect(checkForStatus).toHaveBeenCalled();
      expect(checkForStatus).toHaveBeenCalledWith(expect.any(Function));
      const [funcArg] = getMockCallValue<FetchCall>(
        checkForStatus as jest.Mock
      );
      expect(funcArg.name).toBe('baseFetch');
    });

    it('the functions are included in a particular order', () => {
      expect(checkForErrors).toHaveBeenCalledBefore(
        checkForStatus as jest.Mock
      );
      expect(checkForStatus).toHaveBeenCalledAfter(checkForErrors as jest.Mock);
    });
  });

  describe('default behaviour', () => {
    const mockUrl = 'mock-url';
    const mockOptions = {};
    const mockResponse = 'mock-response-body';
    let fetchResult: Promise<Response>;

    beforeAll(() => {
      (fetch as FetchMock).mockResponse(mockResponse);
      fetchResult = Fetch(mockUrl, mockOptions) as Promise<Response>;
    });

    it('the Fetch function calls the native fetch function', () => {
      expect(fetch).toHaveBeenCalled();
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(mockUrl, mockOptions);
    });

    // tslint:disable-next-line:ban
    it.skip('the Fetch function return the fetch function Promise', async () => {
      expect(fetch).toHaveReturned();
      expect(fetch).toHaveReturnedWith(fetchResult);
      expect(fetchResult).toResolve();
      await expect(fetchResult).resolves.toHaveProperty('body', mockResponse);
    });
  });
});
