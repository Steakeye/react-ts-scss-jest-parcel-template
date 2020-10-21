import { v4 } from 'uuid';
import { FetchCall, FetchPromise } from '../fetch/Fetch';
import { addRequestID, checkForErrors } from './APIFetchDecorators';
import { APIFetchError } from './APIFetchError';

jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('mock-uuid'),
}));

jest.mock('./APIFetchError', () => ({
  APIFetchError: jest.fn(),
}));

const mockAPIFetch = jest.fn();

describe('FetchDecorators - wrap fetch calls to apply extra functionality', () => {
  const mockUrl = 'mock-url';
  const mockResponse = Promise.resolve({ body: 'mock-response' });

  afterEach(() => {
    mockAPIFetch.mockClear();
  });

  describe('checkForErrors - wraps a fetch in order to check the response for ', () => {
    describe('when wrapping the base Fetch call', () => {
      let decoratedFetch: FetchCall;

      beforeAll(() => {
        decoratedFetch = checkForErrors(mockAPIFetch);
      });

      afterEach(() => {
        ((APIFetchError as unknown) as { mockClear(): void }).mockClear();
      });

      it('it wraps the API fetch call with another function', () => {
        expect(decoratedFetch).toBeFunction();
      });

      describe('when the returned function is called', () => {
        let fetchResponse: FetchPromise;

        describe('and the request was successful', () => {
          beforeAll(() => {
            mockAPIFetch.mockResolvedValue({
              result: 'mock-result',
            });
            fetchResponse = decoratedFetch(mockUrl, {});
          });

          it('the result is returned', async () => {
            expect(fetchResponse).toEqual(mockResponse);
            expect(fetchResponse).toResolve();
            await expect(fetchResponse).resolves.toStrictEqual({
              result: 'mock-result',
            });
          });
        });

        describe('and the request returned errors', () => {
          beforeAll(() => {
            mockAPIFetch.mockResolvedValue({
              errors: ['mock-error'],
              result: 'mock-error-result',
            });
            fetchResponse = decoratedFetch(mockUrl, {});
          });

          it('the fetch throws an error', async () => {
            expect(fetchResponse).toEqual(mockResponse);
            expect(fetchResponse).toReject();
            expect(APIFetchError).toHaveBeenCalled();
            expect(APIFetchError).toHaveBeenCalledTimes(1);
            expect(APIFetchError).toHaveBeenCalledWith('mock-url', [
              'mock-error',
            ]);
            await expect(fetchResponse).rejects.toEqual(new APIFetchError());
          });
        });
      });
    });
  });

  describe('addRequestID - wraps a fetch in order to add a unique request id to the request headers', () => {
    describe('when wrapping the base Fetch call', () => {
      let decoratedFetch: FetchCall;

      beforeAll(() => {
        decoratedFetch = addRequestID(mockAPIFetch);
      });

      it('it wraps the API fetch call with another function', () => {
        expect(decoratedFetch).toBeFunction();
      });

      describe('when the returned function is called', () => {
        let fetchResponse: FetchPromise;

        beforeAll(() => {
          mockAPIFetch.mockResolvedValue({
            ok: true,
            body: 'mock-response',
            statusText: 'mock-status-text',
            status: 200,
          });
          fetchResponse = decoratedFetch(mockUrl, {});
        });

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

        describe.each`
          fetchOptions                                            | mutatedFetchOptions                                     | headerAdded | condition
          ${undefined}                                            | ${{ headers: { 'X-Request-ID': 'mock-uuid' } }}         | ${true}     | ${'no fetch options'}
          ${{}}                                                   | ${{ headers: { 'X-Request-ID': 'mock-uuid' } }}         | ${true}     | ${'empty fetch options'}
          ${{ headers: {} }}                                      | ${{ headers: { 'X-Request-ID': 'mock-uuid' } }}         | ${true}     | ${'fetch options, with empty headers'}
          ${{ headers: { 'X-Request-ID': 'custom-request-id' } }} | ${{ headers: { 'X-Request-ID': 'custom-request-id' } }} | ${false}    | ${'fetch options, with custom request header'}
        `(
          'When with $condition',
          ({ fetchOptions, mutatedFetchOptions, headerAdded }) => {
            const typicalMutatedFetchOptions = {
              headers: { 'X-Request-ID': 'mock-uuid' },
            };

            beforeAll(() => {
              mockAPIFetch.mockClear();
              (v4 as jest.Mock).mockClear();
              fetchResponse = decoratedFetch(mockUrl, fetchOptions);
            });

            it(`the request header is ${
              headerAdded ? '' : 'not '
            }added`, () => {
              expect(mockAPIFetch).toHaveBeenCalled();
              expect(mockAPIFetch).toHaveBeenCalledTimes(1);
              expect(mockAPIFetch).toHaveBeenCalledWith(
                mockUrl,
                mutatedFetchOptions
              );

              if (headerAdded) {
                expect(v4).toHaveBeenCalled();
                expect(v4).toHaveBeenCalledTimes(1);
                expect(mutatedFetchOptions).toStrictEqual(
                  typicalMutatedFetchOptions
                );
              } else {
                expect(v4).not.toHaveBeenCalled();
                expect(mutatedFetchOptions).not.toStrictEqual(
                  typicalMutatedFetchOptions
                );
              }
            });
          }
        );
      });
    });
  });
});
