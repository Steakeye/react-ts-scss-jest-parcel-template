import { FetchCall, FetchPromise } from './Fetch';
import { isStatusFail } from './FetchUtils';

import { checkForErrors, checkForStatus } from './FetchDecorators';

jest.mock('./FetchUtils', () => ({
  isStatusFail: jest.fn(),
}));

const mockBaseFetch = jest.fn();

describe('FetchDecorators - wrap fetch calls to apply extra functionality', () => {
  const mockUrl = 'mock-url';
  const mockOptions = {};
  const mockResponse = Promise.resolve({ body: 'mock-response' });

  afterEach(() => {
    mockBaseFetch.mockClear();
  });

  describe('checkForErrors - wraps a fetch to check the response is ok', () => {
    describe('when wrapping the base Fetch call', () => {
      let decoratedFetch: FetchCall;

      beforeAll(() => {
        decoratedFetch = checkForErrors(mockBaseFetch);
      });

      it('it wraps the fetch call with another function', () => {
        expect(decoratedFetch).toBeFunction();
      });

      describe('when the returned function is called', () => {
        let fetchResponse: FetchPromise;

        beforeAll(() => {
          mockBaseFetch.mockResolvedValue({
            ok: true,
            body: 'mock-response',
            statusText: 'mock-status-text',
            status: 200,
          });
          fetchResponse = decoratedFetch(mockUrl, mockOptions);
        });

        it('it calls the wrapped fetch function', () => {
          expect(mockBaseFetch).toHaveBeenCalled();
          expect(mockBaseFetch).toHaveBeenCalledTimes(1);
          expect(mockBaseFetch).toHaveBeenCalledWith(mockUrl, mockOptions);
        });

        describe('when the response is ok', () => {
          it('the response is returned in a promise', async () => {
            expect(fetchResponse).toEqual(mockResponse);
            expect(fetchResponse).toResolve();
            await expect(fetchResponse).resolves.toStrictEqual({
              ok: true,
              body: 'mock-response',
              statusText: 'mock-status-text',
              status: 200,
            });
          });
        });

        // tslint:disable-next-line:ban
        describe.skip('when the response is not ok', () => {
          beforeAll(() => {
            mockBaseFetch.mockResolvedValueOnce({
              ok: false,
              body: 'mock-response',
              statusText: 'mock-status-text',
              status: -1,
            });
            fetchResponse = decoratedFetch(mockUrl, mockOptions);
          });

          // tslint:disable-next-line:ban
          it.skip('the response is a rejected promise', async () => {
            expect(fetchResponse).toReject();
            await expect(fetchResponse).not.toResolve();
            await expect(fetchResponse).rejects.toStrictEqual({
              status: -1,
              statusText: 'mock-status-text',
            });
          });
        });
      });
    });
  });

  describe('checkForStatus - wraps a fetch to check the response status codes', () => {
    describe('when wrapping the base Fetch call', () => {
      let decoratedFetch: FetchCall;

      beforeAll(() => {
        decoratedFetch = checkForStatus(mockBaseFetch);
      });

      it('it wraps the fetch call with another function', () => {
        expect(decoratedFetch).toBeFunction();
      });

      describe('when the returned function is called', () => {
        let fetchResponse: FetchPromise;

        beforeAll(() => {
          (isStatusFail as jest.Mock).mockReturnValue(false);
          mockBaseFetch.mockResolvedValue({
            ok: true,
            body: 'mock-response',
            statusText: 'mock-status-text',
          });
          fetchResponse = decoratedFetch(mockUrl, mockOptions);
        });

        it('it calls the wrapped fetch function', () => {
          expect(mockBaseFetch).toHaveBeenCalled();
          expect(mockBaseFetch).toHaveBeenCalledTimes(1);
          expect(mockBaseFetch).toHaveBeenCalledWith(mockUrl, mockOptions);
        });

        describe('when the status is ok', () => {
          it('the response is returned in a promise', async () => {
            expect(fetchResponse).toEqual(mockResponse);
            expect(fetchResponse).toResolve();
            await expect(fetchResponse).resolves.toStrictEqual({
              ok: true,
              body: 'mock-response',
              statusText: 'mock-status-text',
            });
          });
        });

        describe('when the status is not ok', () => {
          beforeAll(() => {
            (isStatusFail as jest.Mock).mockReturnValue(true);
            mockBaseFetch.mockResolvedValueOnce({
              ok: false,
              body: 'mock-response',
              statusText: 'mock-status-text',
              status: -1,
            });
            fetchResponse = decoratedFetch(mockUrl, mockOptions);
          });

          it('the response is a rejected promise', async () => {
            expect(fetchResponse).toReject();
            await expect(fetchResponse).not.toResolve();
            await expect(fetchResponse).rejects.toStrictEqual({
              status: -1,
              statusText: 'mock-status-text',
            });
          });
        });
      });
    });
  });
});
