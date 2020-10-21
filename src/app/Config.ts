import { Config as ConfigObject } from './Config.d';

enum AppLevel {
  DEV = 'dev',
  UAT = 'uat',
  PROD = 'prod',
}

const appLevel = process.env.ENV_LEVEL as AppLevel;

const config: ConfigObject = {
  app: { level: appLevel },
  //analytics: {},
  api: {
    root: process.env.API_ROOT as string,
    /*versionStable: 'v1',
    versionDeprecated: undefined,
    versionExperimental: 'v2',*/
  },
  //externalLinks: {},
  //externalAssets: {},
  /*legal: {
    GDPR: {
      consentLimitInDays: 183, //6 months
      consentKey: 'gdprConsent',
    },
  },*/
};

export { config as Config, AppLevel };
