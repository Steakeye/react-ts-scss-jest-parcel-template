import { isStatusFail, isStatusSuccess } from './FetchUtils';

describe('FetchUtils - utilities for the Fetch service modules', () => {
  describe('isStatusFail - checks if a status number is considered a fail', () => {
    describe.each`
      status | expected
      ${0}   | ${false}
      ${200} | ${false}
      ${399} | ${false}
      ${400} | ${true}
      ${404} | ${true}
      ${500} | ${true}
    `(
      'When status is $status expected fail result it $expected',
      ({ status, expected }) => {
        let result: boolean;

        beforeAll(() => {
          result = isStatusFail(status);
        });

        it(`result is ${expected}`, () => {
          expect(result).toBe(expected);
        });
      }
    );
  });

  describe('isStatusSuccess - checks if a status number is considered a success', () => {
    describe.each`
      status | expected
      ${200} | ${true}
      ${0}   | ${false}
      ${399} | ${false}
      ${400} | ${false}
      ${404} | ${false}
      ${500} | ${false}
    `(
      'When status is $status expected success result is $result',
      ({ status, expected }) => {
        let result: boolean;

        beforeAll(() => {
          result = isStatusSuccess(status);
        });

        it(`result is ${expected}`, () => {
          expect(result).toBe(expected);
        });
      }
    );
  });
});
