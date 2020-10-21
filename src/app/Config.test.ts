import { Config } from '~/app/Config.d';

describe('Application config', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // this is important - it clears the cache
    process.env = { ...OLD_ENV };
    delete process.env.NODE_ENV;
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  describe('When configuring API config', () => {
    const mockAPIRoot = 'mock-api-root';
    const apiVersion = 'v1';
    let config: Config;

    beforeEach(async () => {
      process.env.API_ROOT = mockAPIRoot;
      config = (await import('./Config')).Config as Config;
    });

    it('The API root value is picked up from the environment variable file', () => {
      const {
        api: { root },
      } = config;
      expect(root).toEqual(mockAPIRoot);
    });

    xit('The API version value is a static value', () => {
      const {
        api: { versionStable },
      } = config;
      expect(versionStable).toEqual(apiVersion);
    });
  });
});
